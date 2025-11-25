import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface ISosController {
  saveContacts(httpRequest: HttpRequest): Promise<HttpResponse>;
  getContacts(httpRequest: HttpRequest): Promise<HttpResponse>;
}
