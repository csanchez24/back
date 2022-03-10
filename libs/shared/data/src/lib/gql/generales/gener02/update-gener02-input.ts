import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateGener02Input } from './create-gener02-input';
import { MinLength } from 'class-validator';

@InputType()
export class UpdateGener02Input extends PartialType(CreateGener02Input) {
  @Field()
  @MinLength(1)
  id: number;
}
