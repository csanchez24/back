import {
  Application,
  Resource,
  Role,
  RolePolice,
  User,
  UserPolice,
  Notification,
} from '@back/shared/data';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslAbilityFactory } from './casl-ability.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Resource,
      RolePolice,
      UserPolice,
      Role,
      Application,
      User,
      Notification,
    ]),
  ],
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
