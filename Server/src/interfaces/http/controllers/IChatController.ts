import type { HttpRequest } from '../helpers/implementation/httpRequest';
import type { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IChatController {
  getMessages(httpRequest: HttpRequest): Promise<HttpResponse>;
  sendMessage(httpRequest: HttpRequest): Promise<HttpResponse>;
}
