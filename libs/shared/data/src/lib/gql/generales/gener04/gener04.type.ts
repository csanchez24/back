import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Gener04')
export class Gener04Type {
  @Field(() => ID)
  id: number;

  @Field()
  message: string;

  @Field()
  read: boolean;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
