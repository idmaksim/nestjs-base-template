import { Module } from '@nestjs/common';
import { PermissionService } from './permissions.service';
import { PermissionRepository } from './permissions.repository';
import { UsersModule } from '@app/users';
import { PrismaService } from '@app/prisma/prisma.service';
import { PERMISSION_SERVICE } from '@app/common/constants/providers.const';
import { PrismaModule } from '@app/prisma/prisma.module';

@Module({
  controllers: [],
  providers: [
    {
      provide: PERMISSION_SERVICE,
      useClass: PermissionService,
    },
    PermissionRepository,
  ],
  exports: [PERMISSION_SERVICE],
  imports: [UsersModule, PrismaModule],
})
export class PermissionModule {}
