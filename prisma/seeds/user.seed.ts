import { BaseRoleEnum } from '../../libs/common/src/constants/base-roles.enum';
import { PrismaClient } from '@prisma/client';

export const seedUser = async (prisma: PrismaClient) => {
  await prisma.user.create({
    data: {
      email: 'string@gmail.com',
      password: '$2a$04$3EuFgtfrKleWTT2lHiioTOfk7d6r0vz.B.Scf4rKGEaJSQ6bfiFBi',
      isActive: true,
      role: {
        connect: {
          name: BaseRoleEnum.Admin,
        },
      },
    },
  });
};
