import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Gener05')
export class Gener05Type {
  @Field(() => ID)
  id: number;

  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  order: number;
}
