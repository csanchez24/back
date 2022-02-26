import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Gener02Type } from '../gener02/gener02.type';

@ObjectType('Gener21')
export class Gener21Type {
  @Field(() => ID)
  id: number;

  @Field()
  role: string;

  @Field()
  description: string;

  @Field(() => [Gener02Type])
  users: string;
}
