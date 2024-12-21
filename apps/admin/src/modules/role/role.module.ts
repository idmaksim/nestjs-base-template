import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { PermissionModule } from '@app/permissions';
import { UsersModule } from '@app/users';
import { RoleModule as LibRoleModule } from '@app/role';
@Module({
  controllers: [RoleController],
  providers: [],
  imports: [PermissionModule, UsersModule, LibRoleModule],
})
export class RoleModule {}
