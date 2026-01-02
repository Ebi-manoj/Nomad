import type { DashboardRange } from '../../domain/dto/adminDashboardDTO';
import type { RevenueOverviewDTO, RevenueTransactionDTO, RevenueSummaryDTO } from '../../domain/dto/adminRevenueDTO';

export interface IRevenueService {
  getOverview(
    range: DashboardRange,
    options?: { startDate?: Date; endDate?: Date; page?: number; limit?: number }
  ): Promise<RevenueOverviewDTO>;

  getReport(
    range: DashboardRange,
    options?: { startDate?: Date; endDate?: Date }
  ): Promise<{ summary: RevenueSummaryDTO; transactions: RevenueTransactionDTO[] }>;
}
