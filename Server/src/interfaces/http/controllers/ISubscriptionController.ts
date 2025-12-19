import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface ISubscriptionController {
  getActivePlans(httpRequest: HttpRequest): Promise<HttpResponse>;
  createCheckoutSession(httpRequest: HttpRequest): Promise<HttpResponse>;
  handleWebhook(httpRequest: HttpRequest): Promise<HttpResponse>;
  verifySubscription(httpRequest: HttpRequest): Promise<HttpResponse>;
  getSubscription(httpRequest: HttpRequest): Promise<HttpResponse>;
  changePlan(httpRequest: HttpRequest): Promise<HttpResponse>;
}
