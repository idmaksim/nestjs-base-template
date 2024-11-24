import { forwardRef, Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { RolePermissionModule } from '../role-permission/role-permission.module';
import { PermissionRepository } from './permission.repository';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService, PermissionRepository],
  exports: [PermissionService],
  imports: [
    forwardRef(() => UsersModule),
    RolePermissionModule,
    TypeOrmModule.forFeature([Permission]),
  ],
})
export class PermissionModule {}
