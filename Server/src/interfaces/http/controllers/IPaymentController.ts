import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IPaymentController {
  getPaymentInfo(httpRequest: HttpRequest): Promise<HttpResponse>;
}
