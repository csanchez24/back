import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gener02, Gener04 } from '@back/shared/data';
import { Repository } from 'typeorm';

@Injectable()
export class Gener04Service {
  constructor(
    @InjectRepository(Gener04) private gener04Repository: Repository<Gener04>,
  ) {}

  async get(gener02: Gener02): Promise<Gener04[]> {
    return this.gener04Repository.find({ gener02: gener02 });
  }
}
