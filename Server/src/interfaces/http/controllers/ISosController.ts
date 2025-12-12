import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface ISosController {
  saveContacts(httpRequest: HttpRequest): Promise<HttpResponse>;
  getContacts(httpRequest: HttpRequest): Promise<HttpResponse>;
  editContact(httpRequest: HttpRequest): Promise<HttpResponse>;
  deleteContact(httpRequest: HttpRequest): Promise<HttpResponse>;
  triggerSos(httpRequest: HttpRequest): Promise<HttpResponse>;
  triggerRideSos(httpRequest: HttpRequest): Promise<HttpResponse>;
}
