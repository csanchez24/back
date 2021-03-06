import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { User } from '@back/shared/data';
import { Login, Profile } from '../common/interfaces';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  async login(payload: Login): Promise<{ token: string }> {
    return await this.authService.login(payload);
  }

  @MessagePattern({ cmd: 'profile' })
  async profile(payload: Profile): Promise<User> {
    return await this.authService.profile(payload);
  }
}
