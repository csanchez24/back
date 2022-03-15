import { User } from './user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RolePolice } from './role_policies.entity';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  @JoinTable({
    name: 'user_roles',
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];

  @OneToMany(() => RolePolice, (rolePolice) => rolePolice.roles)
  role_policies: RolePolice[];
}
