import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordService } from '@app/password';
import { UsersModule } from '@app/users';
import { TokenModule } from '@app/token';
import { AuthResolver } from './auth.resolver';

@Module({
  providers: [AuthService, PasswordService, AuthResolver],
  imports: [forwardRef(() => UsersModule), TokenModule],
  exports: [AuthService],
})
export class AuthModule {}
