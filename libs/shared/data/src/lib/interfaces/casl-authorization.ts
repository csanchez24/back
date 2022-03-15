import { CaslAction } from '../enums';
import { Application, User } from '../entities';

export interface CaslAuthorization {
  application: Application | undefined;
  moduleName: any;
  user: User;
  action: CaslAction;
}
