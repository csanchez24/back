import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateGener21Input {
  @Field()
  @MinLength(3)
  role: string;

  @Field()
  @MinLength(3)
  description: string;
}
