import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  CaslAction,
  UpdateGener02Input,
  Gener02Type,
} from '@back/shared/data';
import { PoliceGuard, GqlAuthGuard } from '@back/shared/guards';
import { Gener02Service } from './gener02.service';

@Resolver()
export class Gener02Resolver {
  constructor(private gener02Service: Gener02Service) {}

  @UseGuards(PoliceGuard(CaslAction.Update, 'Gener02'))
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Gener02Type)
  updateGener02(
    @Args('updateGener02Input') updateGener02Input: UpdateGener02Input,
  ) {
    return this.gener02Service.update(updateGener02Input);
  }
}
