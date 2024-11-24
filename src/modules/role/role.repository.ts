import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { RoleCreateDto } from './dto/role-create.dto';
import { Permission } from '../permission/entities/permission.entity';
import { permission } from 'process';

@Injectable()
export class RoleRepository extends Repository<Role> {
  constructor(dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }

  async findOneByName(name: string) {
    return this.findOneBy({ name });
  }

  async createRole(dto: RoleCreateDto) {
    return this.save({
      name: dto.name,
      rolePermissions: dto.permissions.map((id) => ({
        permission: { id },
      })),
    });
  }

  async findOneById(id: string) {
    return this.findOne({
      where: { id },
      relations: {
        rolePermissions: {
          permission: true,
        },
      },
    });
  }

  async findAll() {
    return this.find({
      relations: {
        rolePermissions: {
          permission: true,
        },
      },
    });
  }

  async existsById(id: string) {
    return this.existsBy({ id });
  }
}
