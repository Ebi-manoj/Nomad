import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IFileUploaderController {
  getPresignedUrl(httpRequest: HttpRequest): Promise<HttpResponse>;
}
