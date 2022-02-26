import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Gener02 } from '@syseuback/shared/data';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH') private client: ClientProxy) {}

  async login(email: string, password: string) {
    const pattern = { cmd: 'login' };
    const payload = {
      email: email,
      password: password,
    };
    return await lastValueFrom(this.client.send(pattern, payload));
  }

  async getProfile(user: Gener02) {
    const pattern = { cmd: 'profile' };
    return await lastValueFrom(this.client.send(pattern, user));
  }
}
