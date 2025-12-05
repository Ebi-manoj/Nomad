import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface ISubscriptionController {
  createCheckoutSession(httpRequest: HttpRequest): Promise<HttpResponse>;
  handleWebhook(httpRequest: HttpRequest): Promise<HttpResponse>;
}
