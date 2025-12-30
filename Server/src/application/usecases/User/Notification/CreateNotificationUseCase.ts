import { Notification } from '../../../../domain/entities/Notification';
import { CreateNotificationDTO } from '../../../../domain/dto/NotificationDTO';
import { INotificationRepository } from '../../../repositories/INotificationRepository';
import { IRealtimeGateway } from '../../../providers/IRealtimeGateway';
import { ICreateNotificationUseCase } from './ICreateNotificationUseCase';

export class CreateNotificationUseCase implements ICreateNotificationUseCase {
  constructor(
    private readonly _notificationRepository: INotificationRepository,
    private readonly _realtimeGateway: IRealtimeGateway
  ) {}

  async execute(dto: CreateNotificationDTO): Promise<Notification> {
    const notification = new Notification({
      userId: dto.userId,
      type: dto.type,
      title: dto.title,
      message: dto.message,
      data: dto.data,
      read: false,
    });

    const created = await this._notificationRepository.create(notification);

    const unreadCount = await this._notificationRepository.countUnreadByUserId(
      dto.userId
    );

    await this._realtimeGateway.emitToRoom(
      'user',
      dto.userId,
      'new_notification',
      { unreadCount }
    );

    return created;
  }
}
