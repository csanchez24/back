import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '.';
import { Resource } from './resource.entity';

@Entity({ name: 'role_policies' })
export class RolePolice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  allow: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Role, (role) => role.role_policies)
  @JoinColumn({ name: 'role_id' })
  roles: Role[];

  @ManyToOne(() => Resource, (resource) => resource.role_policies)
  @JoinColumn({ name: 'resource_id' })
  resources: Resource[];
}
