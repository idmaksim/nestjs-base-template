import { BaseEntity } from '../../../common/base/base.entity';
import { RolePermission } from '../../role-permission/entities/role-permission.entity';
import { Column, Entity, OneToMany, JoinTable } from 'typeorm';

@Entity()
export class Permission extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission,
    { cascade: ['insert', 'update'] },
  )
  @JoinTable()
  rolePermissions: RolePermission[];
}
