import { CaslAction } from '../enums';
import { Gener02 } from '@syseuback/shared/data';

export interface CaslAuthorization {
  moduleName: any;
  user: Gener02;
  action: CaslAction;
}
