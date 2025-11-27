import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IWalletController {
  getWallet(httpRequest: HttpRequest): Promise<HttpResponse>;
}
