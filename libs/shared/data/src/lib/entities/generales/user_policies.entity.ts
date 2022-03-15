import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role, User } from '.';
import { Resource } from './resource.entity';

@Entity({ name: 'user_policies' })
export class UserPolice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  allow: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.user_policies)
  @JoinColumn({ name: 'user_id' })
  user: User[];

  @ManyToOne(() => Role, (role) => role.role_policies)
  @JoinColumn({ name: 'resource_id' })
  resources: Resource[];
}
