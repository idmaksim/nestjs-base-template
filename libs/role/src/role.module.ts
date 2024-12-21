import { forwardRef, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PermissionModule } from '@app/permissions';
import { RoleRepository } from './role.repository';
import { UsersModule } from '@app/users';
import { PrismaService } from '@app/common/services/prisma.service';

@Module({
  controllers: [RoleController],
  providers: [RoleService, PrismaService, RoleRepository],
  exports: [RoleService],
  imports: [PermissionModule, UsersModule],
})
export class RoleModule {}
