import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { RoleCreateDto } from './dto/role-create.dto';
import { RoleUpdateDto } from './dto/role-update.dto';
import { RoleUpdateOptions } from './interfaces/repository.interfaces';
import { RoleSearchDto } from './dto/role-search.dto';
import { mapPagination, mapSearch } from '@app/prisma';
import { mapSort } from '@app/prisma/map.sort';

@Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async delete(id: string) {
    return this.prisma.role.delete({ where: { id } });
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
    });
  }

  async search(dto: RoleSearchDto) {
    return this.prisma.role.findMany({
      where: mapSearch(dto.filters),
      orderBy: mapSort(dto.sorts),
      ...mapPagination(dto.pagination),
    });
  }

  async count(dto: RoleSearchDto) {
    return this.prisma.role.count({
      where: mapSearch(dto.filters),
    });
  }

  async existsById(id: string) {
    const result = await this.prisma.role.count({
      where: { id },
    });

    return result > 0;
  }

  async existsByName(name: string, id?: string) {
    const result = await this.prisma.role.count({
      where: { name, id: { not: id } },
    });

    return result > 0;
  }
}
