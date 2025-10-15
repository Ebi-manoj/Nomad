import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IGetPresignedURLController {
  getPresignedUrl(httpRequest: HttpRequest): Promise<HttpResponse>;
  getViewPresignedUrl(httpRequest: HttpRequest): Promise<HttpResponse>;
}
