import { DataSource } from 'typeorm';
import { Permission } from '../../../modules/permission/entities/permission.entity';
import { PermissionEnum } from '../../../common/constants/permission.enum';

export async function seedPermission(dataSource: DataSource) {
  const permissionRepository = dataSource.getRepository(Permission);
  const permissions = Object.values(PermissionEnum);
  for (const role of permissions) {
    await permissionRepository.save({ name: role });
  }
}
