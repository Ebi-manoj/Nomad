import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface ISessionController {
  getActiveUserSession(httpRequest: HttpRequest): Promise<HttpResponse>;
}
