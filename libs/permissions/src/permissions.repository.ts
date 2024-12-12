import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/common/services/prisma.service';
import { PermissionSearchDto } from './dto/permission-search.dto';
import { getPagination, mapStringToSearch } from '@app/prisma';
@Injectable()
export class PermissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: string) {
    return this.prisma.permission.findUnique({ where: { id } });
  }

  async search(dto: PermissionSearchDto) {
    return this.prisma.permission.findMany({
      where: mapStringToSearch(dto.filters),
      ...getPagination(dto.pagination),
    });
  }

  async count(dto: PermissionSearchDto) {
    return this.prisma.permission.count({
      where: mapStringToSearch(dto.filters),
    });
  }

  async findManyByRoleId(roleId: string) {
    return this.prisma.permission.findMany({
      where: { rolePermissions: { some: { roleId } } },
    });
  }

  async existsById(id: string): Promise<boolean> {
    return !!(await this.prisma.permission.findUnique({
      where: { id },
      select: { id: true },
    }));
  }

  async existsMany(ids: string[]): Promise<boolean> {
    const permissionExistsResults = await Promise.all(
      ids.map((id) => this.existsById(id)),
    );
    return permissionExistsResults.every((exists) => exists);
  }
}
