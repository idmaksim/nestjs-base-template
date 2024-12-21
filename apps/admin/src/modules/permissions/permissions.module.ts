import { Module } from '@nestjs/common';
import {
  PermissionModule as LibPermissionModule,
  PermissionModule,
} from '@app/permissions';
import { PermissionsResolver } from './permissions.resolver';
import { UsersModule } from '@app/users';
import { PermissionModel } from '@app/permissions/models/permission.model';

@Module({
  imports: [LibPermissionModule, UsersModule, PermissionModule],
  providers: [PermissionsResolver],
  exports: [PermissionsResolver],
})
export class PermissionsModule {}
