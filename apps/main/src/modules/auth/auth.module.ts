import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordService } from '@app/password';
import { UsersModule } from '@app/users';
import { TokenModule } from '@app/token';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, PasswordService],
  imports: [forwardRef(() => UsersModule), TokenModule],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
