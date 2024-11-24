import { forwardRef, Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { RolePermissionModule } from '../role-permission/role-permission.module';
import { PermissionRepository } from './permission.repository';
import { PrismaService } from 'src/common/services/prisma.service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService, PrismaService, PermissionRepository],
  exports: [PermissionService],
  imports: [forwardRef(() => UsersModule), RolePermissionModule],
})
export class PermissionModule {}
