import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gener05 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  order: number;
}
