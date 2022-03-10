import { Module } from '@nestjs/common';
import { Gener04Service } from './gener04.service';
import { Gener04Resolver } from './gener04.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Gener04 } from '@back/shared/data';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gener04]),
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
  providers: [Gener04Service, Gener04Resolver],
})
export class Gener04Module {}
