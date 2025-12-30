import { NotificationDTO } from '../../../../domain/dto/NotificationDTO';
import { INotificationRepository } from '../../../repositories/INotificationRepository';
import { IGetAllNotificationUseCase } from './IGetAllNotificationUseCase';

export class GetAllNotificationUseCase implements IGetAllNotificationUseCase {
  constructor(private readonly notificationRepo: INotificationRepository) {}

  async execute(userId: string): Promise<NotificationDTO[]> {
    const notifications = await this.notificationRepo.findByUserId(userId);

    return notifications.map(n => n.toJson());
  }
}
