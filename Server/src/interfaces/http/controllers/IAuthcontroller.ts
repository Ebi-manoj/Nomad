import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IauthController {
  signup(httpRequest: HttpRequest): Promise<HttpResponse>;
  login(httpRequest: HttpRequest): Promise<HttpResponse>;
  sendSignupOTP(httpRequest: HttpRequest): Promise<HttpResponse>;
  sendResetOTP(httpRequest: HttpRequest): Promise<HttpResponse>;
  verifyOTP(httpRequest: HttpRequest): Promise<HttpResponse>;
  resetPassword(httpRequest: HttpRequest): Promise<HttpResponse>;
  refreshToken(httpRequest: HttpRequest): Promise<HttpResponse>;
}
