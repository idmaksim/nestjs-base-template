import { BaseEntity } from '../../../common/base/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { RolePermission } from '../../role-permission/entities/role-permission.entity';

@Entity()
export class Role extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  rolePermissions: RolePermission[];
}
