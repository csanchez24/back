import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsNumber, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @MinLength(3)
  first_name: string;

  @Field()
  @MinLength(3)
  last_name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(3)
  password: string;

  @Field()
  @IsBoolean()
  is_active: boolean;

  @Field(() => [Number])
  @IsNumber({}, { each: true })
  roles: number[];
}
