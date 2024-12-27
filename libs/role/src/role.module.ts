import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { PermissionModule } from '@app/permissions';
import { RoleRepository } from './role.repository';
import { UsersModule } from '@app/users';
import { PrismaService } from '@app/prisma/prisma.service';
import { PrismaModule } from '@app/prisma/prisma.module';

@Module({
  providers: [RoleService, RoleRepository],
  exports: [RoleService],
  imports: [PermissionModule, UsersModule, PrismaModule],
})
export class RoleModule {}
