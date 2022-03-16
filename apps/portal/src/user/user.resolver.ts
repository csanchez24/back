import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CaslAction, UpdateUserInput, UserType } from '@back/shared/data';
import { PoliceGuard, GqlAuthGuard } from '@back/shared/guards';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(PoliceGuard('ge', CaslAction.Update, 'user'))
  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserType)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput);
  }
}
