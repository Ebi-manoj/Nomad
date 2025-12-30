export interface NotificationItem {
  id?: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt?: string | Date;
  data?: Record<string, unknown>;
}

export interface NotificationsState {
  unreadCount: number;
  items: NotificationItem[];
}
