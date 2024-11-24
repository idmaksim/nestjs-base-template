import { Entity, ManyToOne, Column } from 'typeorm';
import { Permission } from '../../permission/entities/permission.entity';
import { Role } from '../../role/entities/role.entity';
import { BaseEntity } from '../../../common/base/base.entity';

@Entity()
export class RolePermission extends BaseEntity {
  @ManyToOne(() => Role, (role) => role.rolePermissions)
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.rolePermissions)
  permission: Permission;
}
