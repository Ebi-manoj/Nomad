import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IDocumentController {
  verifyDocument(httpRequest: HttpRequest): Promise<HttpResponse>;
  findUserDocuments(httpRequest: HttpRequest): Promise<HttpResponse>;
}
