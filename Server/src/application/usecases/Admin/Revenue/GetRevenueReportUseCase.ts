import type { DashboardRange } from '../../../../domain/dto/adminDashboardDTO';
import type { RevenueSummaryDTO, RevenueTransactionDTO } from '../../../../domain/dto/adminRevenueDTO';
import type { IRevenueService } from '../../../services/IRevenueService';
import type { IGetRevenueReportUseCase } from './IGetRevenueReportUseCase';

export class GetRevenueReportUseCase implements IGetRevenueReportUseCase {
  constructor(private readonly _revenueService: IRevenueService) {}

  async execute(
    range: DashboardRange,
    options?: { startDate?: Date; endDate?: Date }
  ): Promise<{ summary: RevenueSummaryDTO; transactions: RevenueTransactionDTO[] }> {
    const { summary, transactions } = await this._revenueService.getReport(range, options);
    return { summary, transactions };
  }
}
