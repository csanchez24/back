import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gener02 } from './';

@Entity()
export class Gener04 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  message: string;

  @Column()
  read: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Gener02, (gener02) => gener02.gener04)
  gener02: Gener02;
}
