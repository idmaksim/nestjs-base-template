import { Column, Entity, JoinColumn, JoinTable, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { Role } from '../../role/entities/role.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  roleId: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Role, (role) => role.users, {
    cascade: true,
  })
  @JoinColumn({ name: 'roleId' })
  @JoinTable()
  role: Role;
}
