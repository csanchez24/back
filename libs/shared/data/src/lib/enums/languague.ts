import { registerEnumType } from '@nestjs/graphql';

export enum Languague {
  EN = 'EN',
  ES = 'ES',
}

registerEnumType(Languague, {
  name: 'Languague',
});
