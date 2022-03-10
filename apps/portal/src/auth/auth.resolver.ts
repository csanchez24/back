import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  AuthInput,
  AuthType,
  Gener02,
  Gener02Type,
} from '@back/shared/data';
import { CurrentUser } from '@back/shared/decorators';
import { GqlAuthGuard } from '@back/shared/guards';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => AuthType, { nullable: true })
  async login(@Args('loginInput') loginInput: AuthInput) {
    const { email, password } = loginInput;
    const token = await this.authService.login(email, password);
    if (!token) {
      throw new Error('Invalid email or password');
    }
    return token;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Gener02Type)
  async getProfile(@CurrentUser() gener02: Gener02) {
    return gener02;
  }
}
