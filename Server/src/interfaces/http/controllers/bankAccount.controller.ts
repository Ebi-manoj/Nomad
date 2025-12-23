import { Unauthorized } from '../../../domain/errors/CustomError';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { ApiResponse } from '../helpers/implementation/apiResponse';
import { IBankAccountController } from './IBankAccountController';
import { IAddBankAccountUseCase } from '../../../application/usecases/User/BankAccount/IAddBankAccount';
import { IGetBankAccountsUseCase } from '../../../application/usecases/User/BankAccount/IGetBankAccounts';
import { addBankAccountSchema } from '../../validators/bankAccountValidator';

export class BankAccountController implements IBankAccountController {
  constructor(
    private readonly _addBankAccountUseCase: IAddBankAccountUseCase,
    private readonly _getBankAccountsUseCase: IGetBankAccountsUseCase
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
      bankName: '',
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
}
