import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, MinLength } from 'class-validator';

@InputType()
export class CreateApplicationInput {
  @Field()
  @MinLength(2)
  code: string;

  @Field()
  @MinLength(3)
  name: string;

  @Field()
  @IsNumber()
  order: number;
}
