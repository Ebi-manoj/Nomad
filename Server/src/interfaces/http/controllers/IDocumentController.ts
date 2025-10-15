import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IDocumentController {
  uploadDocument(httpRequest: HttpRequest): Promise<HttpResponse>;
  findUserDocuments(httpRequest: HttpRequest): Promise<HttpResponse>;
  findAllDocuments(httpRequest: HttpRequest): Promise<HttpResponse>;
  veirfyDocument(httpRequest: HttpRequest): Promise<HttpResponse>;
}
