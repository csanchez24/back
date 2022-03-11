import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserType } from '../user/user.type';

@ObjectType('Role')
export class RoleType {
  @Field(() => ID)
  id: number;

  @Field()
  role: string;

  @Field()
  description: string;

  @Field(() => [UserType])
  users: string;
}
