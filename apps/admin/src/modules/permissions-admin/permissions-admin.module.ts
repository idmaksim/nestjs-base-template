import { Module } from '@nestjs/common';
import { PermissionController } from './permissions-admin.controller';
import { PermissionModule } from '@app/permissions';

@Module({
  imports: [PermissionModule],
  controllers: [PermissionController],
})
export class PermissionsAdminModule {}
