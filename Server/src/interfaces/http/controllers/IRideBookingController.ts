import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IRideBookingController {
  getRideBooking(httpRequest: HttpRequest): Promise<HttpResponse>;
}
