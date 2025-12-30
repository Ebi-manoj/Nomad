import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface INotificationController {
  getNotifications(httpRequest: HttpRequest): Promise<HttpResponse>;
  markAllAsRead(httpRequest: HttpRequest): Promise<HttpResponse>;
}
