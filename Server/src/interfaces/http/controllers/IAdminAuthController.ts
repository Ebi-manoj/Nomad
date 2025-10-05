import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IAdminAuthController {
  login(httpRequest: HttpRequest): Promise<HttpResponse>;
}
