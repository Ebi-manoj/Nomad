import { Types } from 'mongoose';
import { IMapper } from './IMapper';
import { Notification } from '../../domain/entities/Notification';
import { INotificationDocument } from '../database/Notification.model';

export const notificationMapper: IMapper<Notification, INotificationDocument> = {
  toDomain(doc: INotificationDocument): Notification {
    return new Notification({
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      type: doc.type,
      title: doc.title,
      message: doc.message,
      data: doc.data as Record<string, unknown> | undefined,
      read: doc.read,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  },

  toPersistence(domain: Notification): Partial<INotificationDocument> {
    return {
      userId: new Types.ObjectId(domain.getUserId()),
      type: domain.getType(),
      title: domain.getTitle(),
      message: domain.getMessage(),
      data: domain.getData(),
      read: domain.isRead(),
    } as Partial<INotificationDocument>;
  },
};
