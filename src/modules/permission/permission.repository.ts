import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { AppDataSource } from 'src/db/data-source';

@Injectable()
export class PermissionRepository extends Repository<Permission> {
  constructor(dataSource: DataSource) {
    super(Permission, dataSource.createEntityManager());
  }

  async findAll() {
    return this.find();
  }

  async findOneById(id: string) {
    return this.findOneBy({ id });
  }

  async existsById(id: string): Promise<boolean> {
    return this.existsBy({ id });
  }

  async existsMany(uuids: string[]): Promise<boolean> {
    const permissionExistsResults = await Promise.all(
      uuids.map((uuid) => this.existsById(uuid)),
    );
    return permissionExistsResults.every((exists) => exists);
  }
}
