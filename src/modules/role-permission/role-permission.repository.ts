import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RolePermission } from './entities/role-permission.entity';

@Injectable()
export class RolePermissionRepository extends Repository<RolePermission> {
  constructor(dataSource: DataSource) {
    super(RolePermission, dataSource.createEntityManager());
  }

  async findManyByRoleId(roleId: string) {
    return this.find({
      where: { role: { id: roleId } },
      relations: {
        permission: true,
      },
    });
  }
}
