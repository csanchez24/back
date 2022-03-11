import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user-input';
import { MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  @MinLength(1)
  id: number;
}
