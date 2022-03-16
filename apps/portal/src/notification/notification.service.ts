import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Notification } from '@back/shared/data';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async get(user: User): Promise<Notification[]> {
    return this.notificationRepository.find({ user });
  }

  async markAsRead(id: string): Promise<Notification> {
    await this.notificationRepository.update(id, { read: true });
    return await this.notificationRepository.findOne(id);
  }
}
