import { Prisma, PrismaClient } from '@prisma/client';
import { PermissionEnum } from '../../libs/common/src/constants/permission.enum';

export async function seedRole(prisma: PrismaClient) {
  await createRole(prisma, 'admin', null);
  await createRole(prisma, 'user', [PermissionEnum.UserGet]);
}

async function createRole(
  prisma: PrismaClient,
  roleName: string,
  permissionNames: PermissionEnum[] | null,
) {
  await prisma.$transaction(async (prisma) => {
    const createdRole = await prisma.role.create({
      data: { name: roleName },
    });

    const permissionsQuery: Prisma.PermissionWhereInput = permissionNames
      ? { name: { in: permissionNames } }
      : {};

    const permissions = await prisma.permission.findMany({
      where: permissionsQuery,
    });

    await prisma.rolePermission.createMany({
      data: permissions.map((permission) => ({
        roleId: createdRole.id,
        permissionId: permission.id,
      })),
    });
  });
}
