import { CaslAction } from '../enums';
import { User } from '@back/shared/data';

export interface CaslAuthorization {
  moduleName: any;
  user: User;
  action: CaslAction;
}
