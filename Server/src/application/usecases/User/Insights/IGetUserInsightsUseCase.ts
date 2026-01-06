import type { UserDashboardDTO } from '../../../../domain/dto/userDashboardDTO';

export interface IGetUserInsightsUseCase {
  execute(userId: string): Promise<UserDashboardDTO>;
}
