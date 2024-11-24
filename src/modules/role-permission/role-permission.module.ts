import { forwardRef, Module } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { RolePermissionRepository } from './role-permission.repository';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from './entities/role-permission.entity';

@Module({
  providers: [RolePermissionService, RolePermissionRepository],
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([RolePermission]),
  ],
  exports: [RolePermissionService],
})
export class RolePermissionModule {}
