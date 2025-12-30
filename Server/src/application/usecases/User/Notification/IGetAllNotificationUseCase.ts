import { NotificationDTO } from '../../../../domain/dto/NotificationDTO';

export interface IGetAllNotificationUseCase {
  execute(userId: string): Promise<NotificationDTO[]>;
}
