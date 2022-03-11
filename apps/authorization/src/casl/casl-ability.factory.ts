import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { CaslAction, User } from '@back/shared/data';

type Subjects = InferSubjects<typeof User> | 'all' | 'Application';

export type AppAbility = Ability<[CaslAction, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[CaslAction, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.roles.find((role) => role.role === 'admin')) {
      can(CaslAction.Manage, 'all');
      //can(CaslAction.Read, 'Application');
      //cannot(Action.Manage, 'all');
      //cannot(CaslAction.Create, 'Application');
    } else {
      //cannot(Action.Manage, 'all');
      //can(Action.Read, 'Application');
      //cannot(Action.Create, 'Application');
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
