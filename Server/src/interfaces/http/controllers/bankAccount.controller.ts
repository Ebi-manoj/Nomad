import { Unauthorized } from '../../../domain/errors/CustomError';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { ApiResponse } from '../helpers/implementation/apiResponse';
import { IBankAccountController } from './IBankAccountController';
import { IAddBankAccountUseCase } from '../../../application/usecases/User/BankAccount/IAddBankAccount';
import { IGetBankAccountsUseCase } from '../../../application/usecases/User/BankAccount/IGetBankAccounts';
import { ISetPrimaryBankAccountUseCase } from '../../../application/usecases/User/BankAccount/ISetPrimaryBankAccount';
import { IDeleteBankAccountUseCase } from '../../../application/usecases/User/BankAccount/IDeleteBankAccount';
import { addBankAccountSchema } from '../../validators/bankAccountValidator';

export class BankAccountController implements IBankAccountController {
  constructor(
    private readonly _addBankAccountUseCase: IAddBankAccountUseCase,
    private readonly _getBankAccountsUseCase: IGetBankAccountsUseCase,
    private readonly _setPrimaryUseCase: ISetPrimaryBankAccountUseCase,
    private readonly _deleteBankAccountUseCase: IDeleteBankAccountUseCase
  ) {}

  async addBankAccount(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const parsed = addBankAccountSchema.parse(httpRequest.body);

    const result = await this._addBankAccountUseCase.execute({
      userId,
      accountHolderName: parsed.accountHolderName,
      accountNumber: parsed.accountNumber,
      ifscCode: parsed.ifscCode,
      accountType: parsed.accountType,
    });

    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async getBankAccounts(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const result = await this._getBankAccountsUseCase.execute(userId);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async setPrimary(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();
    const params = httpRequest.path as { accountId: string };
    await this._setPrimaryUseCase.execute(userId, params.accountId);
    const response = ApiResponse.success({ success: true });
    return new HttpResponse(HttpStatus.OK, response);
  }

  async deleteBankAccount(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();
    const params = httpRequest.path as { accountId: string };
    await this._deleteBankAccountUseCase.execute(userId, params.accountId);
    const response = ApiResponse.success({ success: true });
    return new HttpResponse(HttpStatus.OK, response);
  }
}
