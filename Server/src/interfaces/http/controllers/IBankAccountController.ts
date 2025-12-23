import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IBankAccountController {
  addBankAccount(httpRequest: HttpRequest): Promise<HttpResponse>;
  getBankAccounts(httpRequest: HttpRequest): Promise<HttpResponse>;
}
