import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { Gener04Type, Gener02 } from '@back/shared/data';
import { CurrentUser } from '@back/shared/decorators';
import { GqlAuthGuard } from '@back/shared/guards';
import { Gener04Service } from './gener04.service';

@Resolver()
export class Gener04Resolver {
  constructor(private gener04Service: Gener04Service) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Gener04Type], { name: 'gener04' })
  getGener04(@CurrentUser() gener02: Gener02) {
    console.log(gener02);
    return this.gener04Service.get(gener02);
  }
}
