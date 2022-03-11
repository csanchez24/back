import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { NotificationType, User } from '@back/shared/data';
import { CurrentUser } from '@back/shared/decorators';
import { GqlAuthGuard } from '@back/shared/guards';
import { NotificationService } from './notification.service';

@Resolver()
export class NotificationResolver {
  constructor(private notificationService: NotificationService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [NotificationType], { name: 'notification' })
  getNotification(@CurrentUser() user: User) {
    return this.notificationService.get(user);
  }
}
