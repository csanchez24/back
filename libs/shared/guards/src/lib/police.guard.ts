import { CanActivate, ExecutionContext, Inject, mixin } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CaslAction, CaslAuthorization } from '@back/shared/data';

export const PoliceGuard = (action: CaslAction, moduleName: string) => {
  class PoliceGuardMixin implements CanActivate {
    constructor(@Inject('AUTHORIZATION') private client: ClientProxy) {}
    async canActivate(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context);
      const { user } = ctx.getContext().req;
      const pattern = { cmd: 'authorization' };
      const payload: CaslAuthorization = {
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
