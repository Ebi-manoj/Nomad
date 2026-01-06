import type { DashboardRange } from '../../../../domain/dto/adminDashboardDTO';
import type { RevenueSummaryDTO, RevenueTransactionDTO } from '../../../../domain/dto/adminRevenueDTO';

export interface IGetRevenueReportUseCase {
  execute(
    range: DashboardRange,
    options?: { startDate?: Date; endDate?: Date }
  ): Promise<{ summary: RevenueSummaryDTO; transactions: RevenueTransactionDTO[] }>;
}
