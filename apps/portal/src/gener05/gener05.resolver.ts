import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CaslAction,
  CreateGener05Input,
  Gener05Type,
} from '@back/shared/data';
import { PoliceGuard, GqlAuthGuard } from '@back/shared/guards';
import { Gener05Service } from './gener05.service';

@Resolver()
export class Gener05Resolver {
  constructor(private gener05Service: Gener05Service) {}

  @UseGuards(PoliceGuard(CaslAction.Read, 'Gener05'))
  @UseGuards(GqlAuthGuard)
  @Query(() => Gener05Type, { name: 'gener05' })
  async getGener05(@Args('id', { type: () => Int }) id: number) {
    return this.gener05Service.getOne(id);
  }

  @UseGuards(PoliceGuard(CaslAction.Create, 'Gener05'))
  @UseGuards(GqlAuthGuard)
  @Query(() => [Gener05Type], { name: 'allGener05' })
  async getAllGener05() {
    return this.gener05Service.getAll();
  }

  @UseGuards(PoliceGuard(CaslAction.Create, 'Gener05'))
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Gener05Type)
  createGener05(
    @Args('createGener05Input') createGener05Input: CreateGener05Input,
  ) {
    return this.gener05Service.create(createGener05Input);
  }
}
