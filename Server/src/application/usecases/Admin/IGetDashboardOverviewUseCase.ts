import { DashboardOverviewDTO, DashboardRange } from '../../../domain/dto/adminDashboardDTO';

export interface IGetDashboardOverviewUseCase {
  execute(range: DashboardRange): Promise<DashboardOverviewDTO>;
}
