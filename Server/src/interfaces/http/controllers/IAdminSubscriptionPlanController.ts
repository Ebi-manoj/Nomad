import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IAdminSubscriptionPlanController {
  createSubscriptionPlan(httpRequest: HttpRequest): Promise<HttpResponse>;
}
