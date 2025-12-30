export interface IMarkAllNotificationsReadUseCase {
  execute(userId: string): Promise<{ unreadCount: number }>;
}
