import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  NotificationType,
  User,
  UpdateNotificationInput,
} from '@back/shared/data';
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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => NotificationType)
  updateNotification(
    @Args('updateNotificationInput')
    updateNotificationInput: UpdateNotificationInput,
  ) {
    return this.notificationService.markAsRead(updateNotificationInput.id);
  }
}
