import { Module } from '@nestjs/common';
import { Gener05Service } from './gener05.service';
import { Gener05Resolver } from './gener05.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Gener05 } from '@syseuback/shared/data';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gener05]),
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
  providers: [Gener05Service, Gener05Resolver],
})
export class Gener05Module {}
