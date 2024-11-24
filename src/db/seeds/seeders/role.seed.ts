import { DataSource, EntityManager, In } from 'typeorm';
import { Role } from '../../../modules/role/entities/role.entity';
import { Permission } from '../../../modules/permission/entities/permission.entity';
import { RolePermission } from '../../../modules/role-permission/entities/role-permission.entity';
import { PermissionEnum } from '../../../common/constants/permission.enum';

export async function seedRole(dataSource: DataSource) {
  await dataSource.transaction(async (manager) => {
    await createAdmin(manager);
    await createUser(manager);
  });
}

async function createAdmin(manager: EntityManager) {
  const roleRepository = manager.getRepository(Role);
  const permissionRepository = manager.getRepository(Permission);
  const rolePermissionRepository = manager.getRepository(RolePermission);

  const createdRole = await roleRepository.save({ name: 'admin' });
  const permissions = await permissionRepository.find();
  const rolePermissions = permissions.map((permission) => ({
    role: { id: createdRole.id },
    permission: { id: permission.id },
  }));
  await rolePermissionRepository.save(rolePermissions);
}

async function createUser(manager: EntityManager) {
  const roleRepository = manager.getRepository(Role);
  const permissionRepository = manager.getRepository(Permission);
  const rolePermissionRepository = manager.getRepository(RolePermission);

  const createdRole = await roleRepository.save({ name: 'user' });
  const userPermissions = [PermissionEnum.UserCreate, PermissionEnum.UserGet];
  const permissions = await permissionRepository.find({
    where: {
      name: In(userPermissions),
    },
  });
  await rolePermissionRepository.save(
    permissions.map((permission) => ({
      role: { id: createdRole.id },
      permission: { id: permission.id },
    })),
  );
}
