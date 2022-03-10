import { Injectable } from '@nestjs/common';
import { CaslAuthorization } from '@back/shared/data';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';

@Injectable()
export class AppService {
  constructor(private caslAbilityFactory: CaslAbilityFactory) {}

  validate(casl: CaslAuthorization): boolean {
    const ability = this.caslAbilityFactory.createForUser(casl.user);
    if (ability.can(casl.action, casl.moduleName)) {
      return true;
    }
    if (ability.can(casl.action, 'all')) {
      return true;
    }
    return false;
  }
}
