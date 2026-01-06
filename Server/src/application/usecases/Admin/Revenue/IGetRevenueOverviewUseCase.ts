import type { DashboardRange } from '../../../../domain/dto/adminDashboardDTO';
import type { RevenueOverviewDTO } from '../../../../domain/dto/adminRevenueDTO';

export interface IGetRevenueOverviewUseCase {
  execute(
    range: DashboardRange,
    options?: { startDate?: Date; endDate?: Date; page?: number; limit?: number }
  ): Promise<RevenueOverviewDTO>;
}
