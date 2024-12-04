import { Module } from '@nestjs/common';
import { PermissionService } from './permissions.service';
import { PermissionRepository } from './permissions.repository';
import { UsersModule } from '@app/users';
import { PrismaService } from '@app/common/services/prisma.service';
import { PERMISSION_SERVICE } from '@app/common/constants/providers.const';

@Module({
  controllers: [],
  providers: [
    {
      provide: PERMISSION_SERVICE,
      useClass: PermissionService,
    },
    PrismaService,
    PermissionRepository,
  ],
  exports: [PERMISSION_SERVICE],
  imports: [UsersModule],
})
export class PermissionModule {}
