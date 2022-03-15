import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {
  User,
  Notification,
  Role,
  RolePolice,
  UserPolice,
} from '@back/shared/data';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RolePolice,
      UserPolice,
      User,
      Notification,
      Role,
    ]),
    JwtModule.register({
      secret: 'control',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
