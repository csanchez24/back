import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CaslAuthorization } from '@syseuback/shared/data';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'authorization' })
  authorization(payload: CaslAuthorization): boolean {
    return this.appService.validate(payload);
  }
}
