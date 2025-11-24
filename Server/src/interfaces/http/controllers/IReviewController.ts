import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IReviewController {
  rateUser(httpRequest: HttpRequest): Promise<HttpResponse>;
}
