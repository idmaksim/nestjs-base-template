import { SetMetadata } from '@nestjs/common';
import { PermissionEnum } from 'src/common/constants/permission.enum';

export const HasPermissions = (...permissions: PermissionEnum[]) =>
  SetMetadata('permissions', permissions);
