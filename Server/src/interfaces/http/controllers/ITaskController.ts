import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface ITaskController {
  getTasks(httpRequest: HttpRequest): Promise<HttpResponse>;
  getTaskOTPForHiker(httpRequest: HttpRequest): Promise<HttpResponse>;
}
