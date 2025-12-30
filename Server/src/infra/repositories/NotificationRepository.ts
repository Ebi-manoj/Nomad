import { MongoBaseRepository } from './BaseRepository';
import { INotificationRepository } from '../../application/repositories/INotificationRepository';
import { Notification } from '../../domain/entities/Notification';
import {
  INotificationDocument,
  NotificationModel,
} from '../database/Notification.model';
import { notificationMapper } from '../mappers/notificationMapper';

export class NotificationRepository
  extends MongoBaseRepository<Notification, INotificationDocument>
  implements INotificationRepository
{
  constructor() {
    super(NotificationModel, notificationMapper);
  }

  async findByUserId(userId: string, limit?: number): Promise<Notification[]> {
    const query = NotificationModel.find({ userId }).sort({ createdAt: -1 });
    if (typeof limit === 'number') query.limit(limit);
    const docs = await query.exec();
    return docs.map(doc => this.mapper.toDomain(doc));
  }

  async findUnreadByUserId(
    userId: string,
    limit?: number
  ): Promise<Notification[]> {
    const query = NotificationModel.find({ userId, read: false }).sort({
      createdAt: -1,
    });
    if (typeof limit === 'number') query.limit(limit);
    const docs = await query.exec();
    return docs.map(doc => this.mapper.toDomain(doc));
  }

  async markAllAsRead(userId: string): Promise<void> {
    await NotificationModel.updateMany({ userId, read: false }, { $set: { read: true } });
  }
}
