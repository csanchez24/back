import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Gener21Type } from '../gener21/gener21.type';

@ObjectType('Gener02')
export class Gener02Type {
  @Field(() => ID)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  isActive: boolean;

  @Field(() => [Gener21Type])
  roles: string;
}
