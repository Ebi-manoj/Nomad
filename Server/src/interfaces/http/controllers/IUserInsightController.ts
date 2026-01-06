import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IUserInsightController {
  getOverview(httpRequest: HttpRequest): Promise<HttpResponse>;
}
