import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGener05Input, Gener05 } from '@back/shared/data';
import { Repository } from 'typeorm';

@Injectable()
export class Gener05Service {
  constructor(
    @InjectRepository(Gener05) private gener05Repository: Repository<Gener05>,
  ) {}

  async getOne(id: number): Promise<Gener05> {
    return this.gener05Repository.findOne({ id });
  }

  async getAll(): Promise<Gener05[]> {
    return this.gener05Repository.find();
  }

  async create(createGener05Input: CreateGener05Input): Promise<Gener05> {
    const { code, name, order } = createGener05Input;
    const gener05 = this.gener05Repository.create({
      code,
      name,
      order,
    });
    return this.gener05Repository.save(gener05);
  }
}
