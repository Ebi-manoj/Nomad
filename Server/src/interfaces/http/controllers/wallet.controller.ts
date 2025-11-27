import { Unauthorized } from '../../../domain/errors/CustomError';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IWalletController } from './IWalletController';
import { IGetWalletDetailsUseCase } from '../../../application/usecases/User/Wallet/IGetWalletDetailsUseCase';

export class WalletController implements IWalletController {
  constructor(
    private readonly getWalletDetailsUseCase: IGetWalletDetailsUseCase
  ) {}

  async getWallet(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const q = httpRequest.query as Record<string, unknown>;
    const page = Number(q.page) || 1;
    const result = await this.getWalletDetailsUseCase.execute(userId, page);

    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
