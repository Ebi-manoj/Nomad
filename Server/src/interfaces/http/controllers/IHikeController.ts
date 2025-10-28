import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IHikeController {
  createHike(httpRequest: HttpRequest): Promise<HttpResponse>;
  matchRides(httpRequest: HttpRequest): Promise<HttpResponse>;
}
