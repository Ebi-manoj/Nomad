import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IAdminDashboardController {
  getOverview(httpRequest: HttpRequest): Promise<HttpResponse>;
}
