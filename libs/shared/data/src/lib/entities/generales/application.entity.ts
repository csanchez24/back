import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Resource } from './resource.entity';

@Entity({ name: 'applications' })
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column('longtext')
  image: string;

  @Column()
  order: number;

  @OneToMany(() => Resource, (resource) => resource.application)
  resources: Resource[];
}
