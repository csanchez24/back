import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Application')
export class ApplicationType {
  @Field(() => ID)
  id: number;

  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  image: string;

  @Field()
  order: number;
}
