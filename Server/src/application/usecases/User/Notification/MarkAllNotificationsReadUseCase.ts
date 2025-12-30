import { INotificationRepository } from '../../../repositories/INotificationRepository';
import { IMarkAllNotificationsReadUseCase } from './IMarkAllNotificationsReadUseCase';

export class MarkAllNotificationsReadUseCase
  implements IMarkAllNotificationsReadUseCase
{
  constructor(private readonly _notificationRepo: INotificationRepository) {}

  async execute(userId: string): Promise<{ unreadCount: number }> {
    await this._notificationRepo.markAllAsRead(userId);
    const unread = await this._notificationRepo.countUnreadByUserId(userId);
    return { unreadCount: unread };
  }
}
