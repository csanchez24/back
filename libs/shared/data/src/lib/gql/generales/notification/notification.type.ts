import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Notification')
export class NotificationType {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  message: string;

  @Field()
  read: boolean;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;
}
