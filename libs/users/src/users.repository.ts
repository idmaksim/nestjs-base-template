import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { PrismaService } from '@app/prisma/prisma.service';
import { BaseRoleEnum } from '@app/common/constants/base-roles.enum';
import { USER_INCLUDE } from '@app/common/types/include/user.include';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: USER_INCLUDE,
    });
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: USER_INCLUDE,
    });
  }

  async create(dto: UserCreateDto) {
    return this.prisma.user.create({
      data: {
        ...dto,
        role: {
          connect: {
            name: BaseRoleEnum.User,
          },
        },
      },
      include: USER_INCLUDE,
    });
  }

  async existsById(id: string) {
    return !!(await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
      },
    }));
  }

  async existsByEmail(email: string) {
    return !!(await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
      },
    }));
  }
}
