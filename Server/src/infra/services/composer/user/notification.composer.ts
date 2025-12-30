import { GetAllNotificationUseCase } from '../../../../application/usecases/User/Notification/GetAllNotificationUseCase';
import { INotificationController } from '../../../../interfaces/http/controllers/INotificationController';
import { NotificationController } from '../../../../interfaces/http/controllers/notification.controller';
import { NotificationRepository } from '../../../repositories/NotificationRepository';

export function notificationComposer(): INotificationController {
  const notificationRepository = new NotificationRepository();
  const getAllNotificationUseCase = new GetAllNotificationUseCase(
    notificationRepository
  );

  return new NotificationController(getAllNotificationUseCase);
}
