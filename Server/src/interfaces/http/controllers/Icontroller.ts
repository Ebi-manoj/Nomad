import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IauthController {
  signup(httpRequest: HttpRequest): Promise<HttpResponse>;
  login(httpRequest: HttpRequest): Promise<HttpResponse>;
}
