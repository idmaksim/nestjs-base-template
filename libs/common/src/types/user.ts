import { Prisma } from '@prisma/client';

export type User = Prisma.UserGetPayload<{
  include: {
    role: {
      include: {
        rolePermissions: {
          include: {
            permission: true;
          };
        };
      };
    };
  };
}>;

export type UserWithoutPassword = Omit<User, 'password'>;
