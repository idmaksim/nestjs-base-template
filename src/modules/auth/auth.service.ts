import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PasswordService } from '../password/password.service';
import { I18nService } from 'nestjs-i18n';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { TokenService } from '../token/token.service';
import { User } from 'src/common/types/user';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
    private readonly i18n: I18nService,
  ) {}

  async signUp(dto: SignUpDto) {
    const user = await this.usersService.create(dto);
    this.logger.log(`Пользователь ${dto.email} зарегистрировался`);
    return {
      accessToken: await this.tokenService.generateAccessToken(user.id),
      refreshToken: await this.tokenService.generateRefreshToken(user.id),
    };
  }

  async signIn(dto: SignInDto) {
    const user = (await this.usersService.findOneByEmail(
      dto.email,
      true,
    )) as User;
    if (
      !(await this.passwordService.comparePassword(dto.password, user.password))
    ) {
      throw new NotFoundException(this.i18n.t('errors.user.notFound'));
    }
    this.logger.log(`Пользователь ${user.email} выполнил вход`);
    return {
      accessToken: await this.tokenService.generateAccessToken(user.id),
      refreshToken: await this.tokenService.generateRefreshToken(user.id),
    };
  }

  async refresh(refreshToken: string) {
    const payload = await this.tokenService.verifyRefreshToken(refreshToken);
    const newAccessToken = await this.tokenService.generateAccessToken(
      payload.id,
    );
    const newRefreshToken = await this.tokenService.generateRefreshToken(
      payload.id,
    );
    this.logger.log(`Пользователь ${payload.id} получил новый access-token`);
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}
