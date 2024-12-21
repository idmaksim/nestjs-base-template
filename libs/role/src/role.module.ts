import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { PermissionModule } from '@app/permissions';
import { RoleRepository } from './role.repository';
import { UsersModule } from '@app/users';
import { PrismaService } from '@app/common/services/prisma.service';

@Module({
  providers: [RoleService, PrismaService, RoleRepository],
  exports: [RoleService],
  imports: [PermissionModule, UsersModule],
})
export class RoleModule {}
