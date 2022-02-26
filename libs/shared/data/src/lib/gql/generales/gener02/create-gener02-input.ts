import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsNumber, MinLength } from 'class-validator';

@InputType()
export class CreateGener02Input {
  @Field()
  @MinLength(3)
  firstName: string;

  @Field()
  @MinLength(3)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(3)
  password: string;

  @Field()
  @IsBoolean()
  isActive: boolean;

  @Field(() => [Number])
  @IsNumber({}, { each: true })
  roles: number[];
}
