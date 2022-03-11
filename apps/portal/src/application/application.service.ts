import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateApplicationInput, Application } from '@back/shared/data';
import { Repository } from 'typeorm';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async getOne(id: number): Promise<Application> {
    return this.applicationRepository.findOne({ id });
  }

  async getAll(): Promise<Application[]> {
    return this.applicationRepository.find();
  }

  async create(
    createApplicationInput: CreateApplicationInput,
  ): Promise<Application> {
    const { code, name, order } = createApplicationInput;
    const application = this.applicationRepository.create({
      code,
      name,
      order,
    });
    return this.applicationRepository.save(application);
  }
}
