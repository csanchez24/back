import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserInput, User } from '@back/shared/data';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const { email, password, first_name, last_name, languague, id } =
      updateUserInput;
    const user = this.userRepository.create({
      email,
      password,
      first_name,
      last_name,
      languague,
    });
    await this.userRepository.update(id, user);
    return await this.userRepository.findOne(id);
  }
}
