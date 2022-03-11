import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { User, Role, Notification } from '@back/shared/data';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Notification]),
    ClientsModule.register([
      {
        name: 'AUTHORIZATION',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 8878,
        },
      },
    ]),
  ],
  providers: [UserService, UserResolver],
})
export class UserModule {}
