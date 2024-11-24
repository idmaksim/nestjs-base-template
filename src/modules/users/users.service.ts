import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserCreateDto } from './dto/user-create.dto';
import { I18nService } from 'nestjs-i18n';
import { User, UserWithoutPassword } from 'src/common/types/user';
import { PasswordService } from '../password/password.service';
import { RoleService } from '../role/role.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordService: PasswordService,
    private readonly roleService: RoleService,
    private readonly i18n: I18nService,
  ) {}

  async create(dto: UserCreateDto) {
    this.logger.log(`Создание пользователя ${dto.email}`);
    await this.ensureExistsByEmail(dto.email);
    const hashedPassword = await this.passwordService.hashPassword(
      dto.password,
    );
    const role = await this.roleService.findOneByName('user');
    const user = await this.usersRepository.save({
      ...dto,
      password: hashedPassword,
      role,
    });
    return this.deletePassword(user);
  }

  async findOneByEmail(email: string, withPassword: boolean = true) {
    const user = await this.usersRepository.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(this.i18n.t('errors.user.notFound'));
    }
    return withPassword ? user : this.deletePassword(user);
  }

  async findOneById(id: string, withPassword: boolean = true) {
    const user = await this.usersRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException(this.i18n.t('errors.user.notFound'));
    }
    return withPassword ? user : this.deletePassword(user);
  }

  async ensureExistsById(id: string) {
    const exists = await this.usersRepository.existsById(id);
    if (!exists) {
      throw new NotFoundException(this.i18n.t('errors.user.notFound'));
    }
  }

  async ensureExistsByEmail(email: string) {
    const exists = await this.usersRepository.existsByEmail(email);
    if (exists) {
      throw new ConflictException(
        this.i18n.translate('errors.user.alreadyExists'),
      );
    }
  }

  private async deletePassword(user: User): Promise<UserWithoutPassword> {
    delete user.password;
    return user;
  }
}
