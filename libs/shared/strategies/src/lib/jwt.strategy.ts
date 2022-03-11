import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('AUTH') private client: ClientProxy) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'control',
    });
  }

  async validate(payload: any) {
    if (!payload?.user) {
      throw new UnauthorizedException();
    }

    const pattern = { cmd: 'profile' };
    const user = await lastValueFrom(this.client.send(pattern, payload.user));
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
