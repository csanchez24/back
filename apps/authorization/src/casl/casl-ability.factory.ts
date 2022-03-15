import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import {
  Application,
  CaslAction,
  Resource,
  RolePolice,
  User,
  UserPolice,
} from '@back/shared/data';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

type Subjects = InferSubjects<typeof User> | 'all' | 'Application' | string;

export type AppAbility = Ability<[CaslAction, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  constructor(
    @InjectRepository(UserPolice)
    private userPoliceRepository: Repository<UserPolice>,
    @InjectRepository(RolePolice)
    private rolePoliceRepository: Repository<RolePolice>,
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) {}

  async createForUser(application: Application, user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[CaslAction, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.roles.find((role) => role.role === 'admin')) {
      can(CaslAction.Read, 'all');
      can(CaslAction.Create, 'all');
      can(CaslAction.Update, 'all');
      can(CaslAction.Delete, 'all');
      can(CaslAction.Process, 'all');
    } else {
      const resources = await this.resourceRepository.find({
        where: { application },
      });
      await Promise.all(
        resources.map(async (resource) => {
          const user_police = await this.userPoliceRepository.findOne({
            where: { resources: resource, user, allow: 1 },
          });
          if (user_police) {
            return can(resource.action, resource.module);
          }
          const role_police = await this.rolePoliceRepository.findOne({
            where: {
              resources: resource,
              roles: In(user.roles.map((role) => role.id)),
              allow: 1,
            },
          });
          if (role_police) {
            return can(resource.action, resource.module);
          }
          cannot(resource.action, resource.module);
        }),
      );
      //can(CaslAction.Read, 'Application');
      //cannot(Action.Create, 'Application');
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
