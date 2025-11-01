import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IRideController {
  createRide(httpRequest: HttpRequest): Promise<HttpResponse>;
  getPendingJoinRequests(httpRequest: HttpRequest): Promise<HttpResponse>;
}
