import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IAdminSubscriptionPlanController {
  createSubscriptionPlan(httpRequest: HttpRequest): Promise<HttpResponse>;
  editSubscriptionPlan(httpRequest: HttpRequest): Promise<HttpResponse>;
  toggleActive(httpRequest: HttpRequest): Promise<HttpResponse>;
  getSubscriptionPlans(httpRequest: HttpRequest): Promise<HttpResponse>;
}
