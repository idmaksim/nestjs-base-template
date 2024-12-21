import { Module } from '@nestjs/common';
import { PermissionModule } from '@app/permissions';
import { UsersModule } from '@app/users';
import { RoleModule as LibRoleModule } from '@app/role';
import { RoleResolver } from './role.resolver';
@Module({
  providers: [RoleResolver],
  imports: [PermissionModule, UsersModule, LibRoleModule],
})
export class RoleModule {}
