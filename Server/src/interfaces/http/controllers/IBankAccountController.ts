import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';

export interface IBankAccountController {
  addBankAccount(httpRequest: HttpRequest): Promise<HttpResponse>;
  getBankAccounts(httpRequest: HttpRequest): Promise<HttpResponse>;
  setPrimary(httpRequest: HttpRequest): Promise<HttpResponse>;
  deleteBankAccount(httpRequest: HttpRequest): Promise<HttpResponse>;
}
