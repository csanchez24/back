import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationResolver } from './application.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  Application,
  Resource,
  RolePolice,
  UserPolice,
} from '@back/shared/data';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application, Resource, UserPolice, RolePolice]),
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
  providers: [ApplicationService, ApplicationResolver],
})
export class ApplicationModule {}
