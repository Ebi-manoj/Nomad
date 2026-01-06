import { AdminRevenueController } from '../../../../interfaces/http/controllers/adminRevenue.controller';
import type { IAdminRevenueController } from '../../../../interfaces/http/controllers/IAdminRevenueController';
import { GetRevenueOverviewUseCase } from '../../../../application/usecases/Admin/Revenue/GetRevenueOverviewUseCase';
import { GetRevenueReportUseCase } from '../../../../application/usecases/Admin/Revenue/GetRevenueReportUseCase';
import { RevenueService } from '../../RevenueService';

export function revenueAdminComposer(): IAdminRevenueController {
  const revenueService = new RevenueService();
  const useCase = new GetRevenueOverviewUseCase(revenueService);
  const reportUseCase = new GetRevenueReportUseCase(revenueService);
  return new AdminRevenueController(useCase, reportUseCase);
}
