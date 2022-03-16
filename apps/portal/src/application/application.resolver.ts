import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CaslAction,
  CreateApplicationInput,
  ApplicationType,
} from '@back/shared/data';
import { PoliceGuard, GqlAuthGuard } from '@back/shared/guards';
import { ApplicationService } from './application.service';

@Resolver()
export class ApplicationResolver {
  constructor(private applicationService: ApplicationService) {}

  @UseGuards(PoliceGuard('ge', CaslAction.Read, 'application'))
  @UseGuards(GqlAuthGuard)
  @Query(() => ApplicationType, { name: 'application' })
  async getApplication(@Args('id', { type: () => Int }) id: number) {
    return this.applicationService.getOne(id);
  }

  @UseGuards(PoliceGuard('ge', CaslAction.Read, 'application'))
  @UseGuards(GqlAuthGuard)
  @Query(() => [ApplicationType], { name: 'allApplication' })
  async getAllApplication() {
    return this.applicationService.getAll();
  }

  @UseGuards(PoliceGuard('ge', CaslAction.Create, 'application'))
  @UseGuards(GqlAuthGuard)
  @Mutation(() => ApplicationType)
  createApplication(
    @Args('createApplicationInput')
    createApplicationInput: CreateApplicationInput,
  ) {
    return this.applicationService.create(createApplicationInput);
  }
}
