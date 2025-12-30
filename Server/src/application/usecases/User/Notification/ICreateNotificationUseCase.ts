import { Notification } from '../../../../domain/entities/Notification';
import { CreateNotificationDTO } from '../../../../domain/dto/NotificationDTO';

export interface ICreateNotificationUseCase {
  execute(dto: CreateNotificationDTO): Promise<Notification>;
}
