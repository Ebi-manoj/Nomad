import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IUploadDocumentController {
  verifyDocument(httpRequest: HttpRequest): Promise<HttpResponse>;
}
