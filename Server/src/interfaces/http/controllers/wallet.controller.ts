import { Unauthorized } from '../../../domain/errors/CustomError';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IWalletController } from './IWalletController';
import { IGetWalletDetailsUseCase } from '../../../application/usecases/User/Wallet/IGetWalletDetailsUseCase';
import { IWithDrawMoneyUseCase } from '../../../application/usecases/User/Wallet/IWithDrawMoneyUseCase';
import { ApiResponse } from '../helpers/implementation/apiResponse';

export class WalletController implements IWalletController {
  constructor(
    private readonly _getWalletDetailsUseCase: IGetWalletDetailsUseCase,
    private readonly _withDrawMoneyUseCase: IWithDrawMoneyUseCase
  ) {}

  async getWallet(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const query = httpRequest.query as Record<string, unknown>;
    const page = Number(query.page) || 1;
    const result = await this._getWalletDetailsUseCase.execute(userId, page);

    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async withdraw(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    await this._withDrawMoneyUseCase.execute(userId);

    const response = ApiResponse.success({ success: true });
    return new HttpResponse(HttpStatus.OK, response);
  }
}
