import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateGener02Input, Gener02 } from '@back/shared/data';
import { Repository } from 'typeorm';

@Injectable()
export class Gener02Service {
  constructor(
    @InjectRepository(Gener02) private gener02Repository: Repository<Gener02>,
  ) {}

  async update(updateGener02Input: UpdateGener02Input): Promise<Gener02> {
    const { email, password, firstName, lastName, id } = updateGener02Input;
    const gener02 = this.gener02Repository.create({
      email,
      password,
      firstName,
      lastName,
    });
    await this.gener02Repository.update(id, gener02);
    return await this.gener02Repository.findOne(id);
  }
}
