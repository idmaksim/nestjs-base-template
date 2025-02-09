import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserCreateDto } from './dto/user-create.dto';
import { I18nService } from 'nestjs-i18n';
import { PasswordService } from '@app/password';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordService: PasswordService,
    private readonly i18n: I18nService,
  ) {}

  async create(dto: UserCreateDto) {
    await this.ensureExistsByEmail(dto.email);
    const hashedPassword = await this.passwordService.hashPassword(
      dto.password,
    );
    const user = await this.usersRepository.create({
      ...dto,
      password: hashedPassword,
    });
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(this.i18n.t('errors.user.notFound'));
    }
    return user;
  }

  async findOneById(id: string) {
    const user = await this.usersRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException(this.i18n.t('errors.user.notFound'));
    }
    return user;
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
}
