import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@back/shared/data';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Login, Profile } from '../common/interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: Login) {
    const user = await this.userRepository.findOne({ email });
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch, password, user.password);
    if (isMatch) {
      return this.getToken(user);
    }
    return null;
  }

  async profile(profile: Profile): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: profile.id },
      relations: ['roles'],
    });
    if (!user) return null;
    return user;
  }

  getToken(user: User) {
    const payload = {
      user: {
        id: user.id,
        name: user.last_name + ' ' + user.first_name,
        email: user.email,
        roles: user.roles,
      },
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
