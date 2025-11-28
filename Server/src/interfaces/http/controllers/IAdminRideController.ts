import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IAdminRideController {
  getAllRides(httpRequest: HttpRequest): Promise<HttpResponse>;
}
