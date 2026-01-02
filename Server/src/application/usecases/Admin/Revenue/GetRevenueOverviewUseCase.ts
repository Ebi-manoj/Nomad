import type { DashboardRange } from '../../../../domain/dto/adminDashboardDTO';
import type { RevenueOverviewDTO } from '../../../../domain/dto/adminRevenueDTO';
import { IRevenueService } from '../../../../application/services/IRevenueService';
import { IGetRevenueOverviewUseCase } from './IGetRevenueOverviewUseCase';

export class GetRevenueOverviewUseCase implements IGetRevenueOverviewUseCase {
  constructor(private readonly _revenueService: IRevenueService) {}

  async execute(
    range: DashboardRange,
    options?: { startDate?: Date; endDate?: Date; page?: number; limit?: number }
  ): Promise<RevenueOverviewDTO> {
    return this._revenueService.getOverview(range, options);
  }
}
