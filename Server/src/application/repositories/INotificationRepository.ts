import { Notification } from '../../domain/entities/Notification';
import { IBaseRepository } from './IBaseRepository';

export interface INotificationRepository
  extends IBaseRepository<Notification> {
  findByUserId(userId: string, limit?: number): Promise<Notification[]>;
  findUnreadByUserId(userId: string, limit?: number): Promise<Notification[]>;
  markAllAsRead(userId: string): Promise<void>;
  countUnreadByUserId(userId: string): Promise<number>;
}
