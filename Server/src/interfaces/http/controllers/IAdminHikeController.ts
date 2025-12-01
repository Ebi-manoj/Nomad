import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IAdminHikeController {
  getAllHikes(httpRequest: HttpRequest): Promise<HttpResponse>;
  getHikeDetails(httpRequest: HttpRequest): Promise<HttpResponse>;
}
