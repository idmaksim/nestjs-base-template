import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@app/common/services/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: this.getInclude(),
    });
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: this.getInclude(),
    });
  }

  async create(dto: UserCreateDto) {
    return this.prisma.user.create({
      data: {
        ...dto,
        role: {
          connect: {
            name: 'user',
          },
        },
      },
      include: this.getInclude(),
    });
  }

  async existsById(id: string) {
    return !!(await this.prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
      },
    }));
  }

  async existsByEmail(email: string) {
    return !!(await this.prisma.user.findFirst({
      where: { email },
      select: {
        id: true,
      },
    }));
  }

  private getInclude(): Prisma.UserInclude {
    return {
      role: {
        include: {
          rolePermissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    };
  }
}
