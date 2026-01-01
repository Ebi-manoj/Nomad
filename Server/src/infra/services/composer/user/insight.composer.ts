import { IUserInsightController } from '../../../../interfaces/http/controllers/IUserInsightController';
import { UserInsightController } from '../../../../interfaces/http/controllers/userInsight.controller';
import { GetUserInsightsUseCase } from '../../../../application/usecases/User/Insights/GetUserInsightsUseCase';
import { InsightService } from '../../InsightService';

export function insightComposer(): IUserInsightController {
  const insightService = new InsightService();
  const useCase = new GetUserInsightsUseCase(insightService);
  return new UserInsightController(useCase);
}
