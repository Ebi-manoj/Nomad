import type { UserDashboardDTO } from '../../../../domain/dto/userDashboardDTO';
import { IInsightService } from '../../../../application/services/IInsightService';
import { IGetUserInsightsUseCase } from './IGetUserInsightsUseCase';

export class GetUserInsightsUseCase implements IGetUserInsightsUseCase {
  constructor(private readonly _insightService: IInsightService) {}

  async execute(userId: string): Promise<UserDashboardDTO> {
    return this._insightService.getOverview(userId);
  }
}
