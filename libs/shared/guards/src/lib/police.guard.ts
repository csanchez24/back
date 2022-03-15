import { CanActivate, ExecutionContext, Inject, mixin } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Application, CaslAction, CaslAuthorization } from '@back/shared/data';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export const PoliceGuard = (
  applicationCode: string,
  action: CaslAction,
  moduleName: string,
) => {
  class PoliceGuardMixin implements CanActivate {
    constructor(
      @Inject('AUTHORIZATION') private client: ClientProxy,
      @InjectRepository(Application)
      private applicationRepository: Repository<Application>,
    ) {}
    async canActivate(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context);
      const { user } = ctx.getContext().req;
      const application = await this.applicationRepository.findOne({
        where: { code: applicationCode },
      });
      const pattern = { cmd: 'authorization' };
      const payload: CaslAuthorization = {
        application,
        moduleName: moduleName,
        user,
        action: action,
      };
      return await lastValueFrom(this.client.send(pattern, payload));
    }
  }

  const guard = mixin(PoliceGuardMixin);
  return guard;
};
