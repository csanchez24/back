import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { CaslAction, Gener02 } from '@back/shared/data';

type Subjects = InferSubjects<typeof Gener02> | 'all' | 'Gener05';

export type AppAbility = Ability<[CaslAction, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: Gener02) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[CaslAction, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.roles.find((gener21) => gener21.role === 'admin')) {
      can(CaslAction.Manage, 'all');
      //can(CaslAction.Read, 'Gener05');
      //cannot(Action.Manage, 'all');
      //cannot(CaslAction.Create, 'Gener05');
    } else {
      //cannot(Action.Manage, 'all');
      //can(Action.Read, 'Gener05');
      //cannot(Action.Create, 'Gener05');
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
