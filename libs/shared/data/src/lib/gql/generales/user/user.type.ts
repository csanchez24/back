import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Languague } from '../../../enums';
import { RoleType } from '../role/role.type';

@ObjectType('User')
export class UserType {
  @Field(() => ID)
  id: number;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  email: string;

  @Field((type) => Languague)
  languague: Languague;

  @Field()
  password: string;

  @Field()
  is_active: boolean;

  @Field(() => [RoleType])
  roles: string;
}
