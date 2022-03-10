import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Gener02 } from '@back/shared/data';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Login, Profile } from '../common/interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Gener02) private gener02Repository: Repository<Gener02>,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: Login) {
    const gener02 = await this.gener02Repository.findOne({ email });
    if (!gener02) return null;
    const isMatch = await bcrypt.compare(password, gener02.password);
    if (isMatch) {
      return this.getToken(gener02);
    }
    return null;
  }

  async profile(profile: Profile): Promise<Gener02> {
    const gener02 = await this.gener02Repository.findOne({
      where: { id: profile.id },
      relations: ['roles'],
    });
    if (!gener02) return null;
    return gener02;
  }

  getToken(user: Gener02) {
    const payload = {
      user: {
        id: user.id,
        name: user.lastName + ' ' + user.firstName,
        email: user.email,
        roles: user.roles,
      },
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
