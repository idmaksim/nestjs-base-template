import { Module } from '@nestjs/common';
import { PermissionController } from './permissions.controller';
import { PermissionModule as LibPermissionModule } from '@app/permissions';
import { PermissionsResolver } from './permissions.resolver';

@Module({
  imports: [LibPermissionModule],
  controllers: [PermissionController],
  providers: [PermissionsResolver],
})
export class PermissionsModule {}
