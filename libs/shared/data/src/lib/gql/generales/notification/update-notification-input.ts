import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class UpdateNotificationInput {
  @Field()
  @MinLength(1)
  id: string;
}
