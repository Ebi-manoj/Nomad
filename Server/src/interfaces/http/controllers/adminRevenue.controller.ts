import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { DashboardRange } from '../../../domain/dto/adminDashboardDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { ApiResponse } from '../helpers/implementation/apiResponse';
import { IAdminRevenueController } from './IAdminRevenueController';
import { IGetRevenueOverviewUseCase } from '../../../application/usecases/Admin/Revenue/IGetRevenueOverviewUseCase';
import { IGetRevenueReportUseCase } from '../../../application/usecases/Admin/Revenue/IGetRevenueReportUseCase';

export class AdminRevenueController implements IAdminRevenueController {
  constructor(
    private readonly _useCase: IGetRevenueOverviewUseCase,
    private readonly _reportUseCase: IGetRevenueReportUseCase
  ) {}

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

  async getReport(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { range, startDate, endDate } = httpRequest.query as {
      range?: string;
      startDate?: string;
      endDate?: string;
    };
    const normalizedRange = (['today', 'monthly', 'yearly'].includes(
      String(range)
    )
      ? (range as DashboardRange)
      : 'yearly') as DashboardRange;

    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;

    const result = await this._reportUseCase.execute(normalizedRange, {
      startDate: start,
      endDate: end,
    });
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
