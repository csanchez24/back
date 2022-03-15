import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'control80',
      database: 'generales_microservice',
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.register({
      secret: 'control',
      signOptions: { expiresIn: '60s' },
    }),
    AuthModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
