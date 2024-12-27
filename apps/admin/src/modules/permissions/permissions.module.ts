import { Module } from '@nestjs/common';
import {
  PermissionModule as LibPermissionModule,
  PermissionModule,
} from '@app/permissions';
import { PermissionsResolver } from './permissions.resolver';
import { UsersModule } from '@app/users';

@Module({
  imports: [LibPermissionModule, UsersModule, PermissionModule],
  providers: [PermissionsResolver],
  exports: [PermissionsResolver],
})
export class PermissionsModule {}
