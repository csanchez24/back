import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CaslAction } from '../../enums';
import { Application } from '.';
import { RolePolice } from './role_policies.entity';

@Entity({ name: 'resources' })
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  module: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: CaslAction,
  })
  action: CaslAction;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Application, (application) => application.resources)
  @JoinColumn({ name: 'application_id' })
  application: Application;

  @OneToMany(() => RolePolice, (rolePolice) => rolePolice.resources)
  role_policies: RolePolice[];
}
