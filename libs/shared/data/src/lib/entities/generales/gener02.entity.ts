import * as bcrypt from 'bcrypt';
import { Gener21 } from './gener21.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Gener02 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;

  @ManyToMany(() => Gener21, (gener21) => gener21.users)
  @JoinTable({ name: 'gener03' })
  roles: Gener21[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }
}
