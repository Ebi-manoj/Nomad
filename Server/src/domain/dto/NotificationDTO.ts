import { NotificationType } from '../enums/Notification';

export interface CreateNotificationDTO {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
}

export interface NotificationDTO {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  data?: Record<string, unknown>;
}
