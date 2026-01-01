import { AdminDashboardController } from '../../../../interfaces/http/controllers/adminDashboard.controller';
import { IAdminDashboardController } from '../../../../interfaces/http/controllers/IAdminDashboardController';
import { GetDashboardOverviewUseCase } from '../../../../application/usecases/Admin/GetDashboardOverviewUseCase';
import { MongoUserRepository } from '../../../repositories/UserRepository';
import { RideRepository } from '../../../repositories/RideRepository';
import { HikeRepository } from '../../../repositories/HikeRepository';
import { SosLogRepository } from '../../../repositories/SosLogRepository';
import { AnalyticsService } from '../../AnalyticsService';

export function dashboardAdminComposer(): IAdminDashboardController {
  const userRepository = new MongoUserRepository();
  const rideRepository = new RideRepository();
  const hikeRepository = new HikeRepository();
  const sosRepository = new SosLogRepository();
  const analyticsService = new AnalyticsService();

  const overviewUseCase = new GetDashboardOverviewUseCase(
    userRepository,
    rideRepository,
    hikeRepository,
    sosRepository,
    analyticsService
  );

  return new AdminDashboardController(overviewUseCase);
}
