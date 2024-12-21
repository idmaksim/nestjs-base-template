import { Module } from '@nestjs/common';
import { UsersModule as LibUserModule } from '@app/users';
import { UsersResolver } from './users.resolver';
@Module({
  imports: [LibUserModule],
  providers: [UsersResolver],
})
export class UsersModule {}
