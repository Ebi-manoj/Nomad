import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IUserManagementController {
  getAllUsers(httpRequest: HttpRequest): Promise<HttpResponse>;
}
