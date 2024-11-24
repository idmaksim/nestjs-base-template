import { forwardRef, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PermissionModule } from '../permission/permission.module';
import { RolePermissionModule } from '../role-permission/role-permission.module';
import { RoleRepository } from './role.repository';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  exports: [RoleService],
  imports: [
    PermissionModule,
    forwardRef(() => UsersModule),
    RolePermissionModule,
    TypeOrmModule.forFeature([Role]),
  ],
})
export class RoleModule {}
