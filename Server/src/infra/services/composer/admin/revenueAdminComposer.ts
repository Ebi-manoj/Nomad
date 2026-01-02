import { AdminRevenueController } from '../../../../interfaces/http/controllers/adminRevenue.controller';
import type { IAdminRevenueController } from '../../../../interfaces/http/controllers/IAdminRevenueController';
import { GetRevenueOverviewUseCase } from '../../../../application/usecases/Admin/Revenue/GetRevenueOverviewUseCase';
import { RevenueService } from '../../RevenueService';

export function revenueAdminComposer(): IAdminRevenueController {
  const revenueService = new RevenueService();
  const useCase = new GetRevenueOverviewUseCase(revenueService);
  return new AdminRevenueController(useCase);
}
