import { Module } from '@nestjs/common';
import { Gener02Service } from './gener02.service';
import { Gener02Resolver } from './gener02.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Gener02, Gener21, Gener04 } from '@back/shared/data';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gener02, Gener21, Gener04]),
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
  providers: [Gener02Service, Gener02Resolver],
})
export class Gener02Module {}
