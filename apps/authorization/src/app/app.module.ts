import { Module } from '@nestjs/common';
import { CaslModule } from '../casl/casl.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CaslModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
