import type { DashboardRange } from '../../domain/dto/adminDashboardDTO';
import type { RevenueOverviewDTO } from '../../domain/dto/adminRevenueDTO';

export interface IRevenueService {
  getOverview(
    range: DashboardRange,
    options?: { startDate?: Date; endDate?: Date; page?: number; limit?: number }
  ): Promise<RevenueOverviewDTO>;
}
