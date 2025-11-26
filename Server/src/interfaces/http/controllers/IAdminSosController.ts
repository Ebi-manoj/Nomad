import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IAdminSosController {
  getSosLogs(httpRequest: HttpRequest): Promise<HttpResponse>;
}
