import { IGetAllNotificationUseCase } from '../../../application/usecases/User/Notification/IGetAllNotificationUseCase';
import { IMarkAllNotificationsReadUseCase } from '../../../application/usecases/User/Notification/IMarkAllNotificationsReadUseCase';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { Unauthorized } from '../../../domain/errors/CustomError';
import { ApiResponse } from '../helpers/implementation/apiResponse';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { INotificationController } from './INotificationController';

export class NotificationController implements INotificationController {
  constructor(
    private readonly _getAllNotifications: IGetAllNotificationUseCase,
    private readonly _markAllAsRead: IMarkAllNotificationsReadUseCase
  ) {}

  async getNotifications(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const notifications = await this._getAllNotifications.execute(userId);
    const response = ApiResponse.success(notifications);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async markAllAsRead(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const result = await this._markAllAsRead.execute(userId);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
