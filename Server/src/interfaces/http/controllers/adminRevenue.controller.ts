import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { DashboardRange } from '../../../domain/dto/adminDashboardDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { ApiResponse } from '../helpers/implementation/apiResponse';
import { IAdminRevenueController } from './IAdminRevenueController';
import { IGetRevenueOverviewUseCase } from '../../../application/usecases/Admin/Revenue/IGetRevenueOverviewUseCase';

export class AdminRevenueController implements IAdminRevenueController {
  constructor(private readonly _useCase: IGetRevenueOverviewUseCase) {}

  async getOverview(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { range, startDate, endDate, page, limit } = httpRequest.query as {
      range?: string;
      startDate?: string;
      endDate?: string;
      page?: string;
      limit?: string;
    };
    const normalizedRange = (['today', 'monthly', 'yearly'].includes(
      String(range)
    )
      ? (range as DashboardRange)
      : 'yearly') as DashboardRange;

    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    const pg = page ? Number(page) : undefined;
    const lm = limit ? Number(limit) : undefined;

    const result = await this._useCase.execute(normalizedRange, {
      startDate: start,
      endDate: end,
      page: pg,
      limit: lm,
    });
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
