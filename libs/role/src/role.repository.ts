import { Injectable } from '@nestjs/common';
import { RoleCreateDto } from './dto/role-create.dto';
import { RoleUpdateDto } from './dto/role-update.dto';
import { RoleUpdateOptions } from './interfaces/repository.interfaces';
import { RoleSearchDto } from './dto/role-search.dto';
import { getPagination, mapStringToSearch } from '@app/prisma';
import { mapSortToPrisma } from '@app/prisma/sort.base';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async delete(id: string) {
    return this.prisma.role.delete({ where: { id } });
  }

  async existsByName(name: string, id?: string) {
    return !!(await this.prisma.role.findFirst({
      where: { name, id: { not: id } },
    }));
  }

  async create(dto: RoleCreateDto) {
    return this.prisma.role.create({
      data: {
        name: dto.name,
        rolePermissions: dto.permissions.length
          ? {
              createMany: {
                data: dto.permissions.map((permission) => ({
                  permissionId: permission,
                })),
              },
            }
          : undefined,
      },
    });
  }

  async update(options: RoleUpdateOptions) {
    return this.prisma.role.update({
      where: { id: options.id },
      data: {
        name: options.dto.name,
        rolePermissions: options.dto.permissions.length
          ? {
              deleteMany: {},
              createMany: {
                data: options.dto.permissions.map((permission) => ({
                  permissionId: permission,
                })),
              },
            }
          : undefined,
      },
    });
  }

  async findOneById(id: string) {
    return this.prisma.role.findUnique({
      where: { id },
      include: this.getInclude(),
    });
  }

  async search(dto: RoleSearchDto) {
    return this.prisma.role.findMany({
      where: mapStringToSearch(dto.filters),
      orderBy: mapSortToPrisma(dto.sorts),
      include: this.getInclude(),
      ...getPagination(dto.pagination),
    });
  }

  async count(dto: RoleSearchDto) {
    return this.prisma.role.count({
      where: mapStringToSearch(dto.filters),
    });
  }

  async existsById(id: string) {
    return !!(await this.prisma.role.findFirst({
      where: { id },
      select: { id: true },
    }));
  }

  private getInclude(): Prisma.RoleInclude {
    return {
      rolePermissions: {
        include: {
          permission: true,
        },
      },
    };
  }
}
