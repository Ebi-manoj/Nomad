import { Unauthorized } from '../../../domain/errors/CustomError';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { ApiResponse } from '../helpers/implementation/apiResponse';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IUserInsightController } from './IUserInsightController';
import { IGetUserInsightsUseCase } from '../../../application/usecases/User/Insights/IGetUserInsightsUseCase';

export class UserInsightController implements IUserInsightController {
  constructor(private readonly _useCase: IGetUserInsightsUseCase) {}

  async getOverview(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const data = await this._useCase.execute(userId);
    const response = ApiResponse.success(data);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
