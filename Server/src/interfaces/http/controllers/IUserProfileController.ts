import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IUserProfileController {
  getProfile(httpRequest: HttpRequest): Promise<HttpResponse>;
  updateProfile(httpRequest: HttpRequest): Promise<HttpResponse>;
}
