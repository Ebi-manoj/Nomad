import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { DashboardRange } from '../../../domain/dto/adminDashboardDTO';
import { IGetDashboardOverviewUseCase } from '../../../application/usecases/Admin/IGetDashboardOverviewUseCase';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { ApiResponse } from '../helpers/implementation/apiResponse';
import { IAdminDashboardController } from './IAdminDashboardController';

export class AdminDashboardController implements IAdminDashboardController {
  constructor(private readonly _overviewUseCase: IGetDashboardOverviewUseCase) {}

  async getOverview(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { range } = httpRequest.query as { range?: DashboardRange };
    const safeRange: DashboardRange = range ?? 'yearly';

    const result = await this._overviewUseCase.execute(safeRange);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
