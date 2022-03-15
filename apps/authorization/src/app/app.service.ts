import { Injectable } from '@nestjs/common';
import { CaslAuthorization } from '@back/shared/data';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';

@Injectable()
export class AppService {
  constructor(private caslAbilityFactory: CaslAbilityFactory) {}

  async validate(casl: CaslAuthorization): Promise<boolean> {
    if (!casl.application || !casl.user) return false;
    const ability = await this.caslAbilityFactory.createForUser(
      casl.application,
      casl.user,
    );
    if (ability.can(casl.action, 'all')) {
      return true;
    }
    if (ability.can(casl.action, casl.moduleName)) {
      return true;
    }
    return false;
  }
}
