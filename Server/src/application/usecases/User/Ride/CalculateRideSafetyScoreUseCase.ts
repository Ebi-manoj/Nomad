import { IRouteDeviationRepository } from '../../../repositories/IRouteDeviationRepository';

export interface SafetyScoreResult {
  score: number; // 0-100
  deviationCount: number;
}

export class CalculateRideSafetyScoreUseCase {
  constructor(
    private readonly _routeDeviationRepository: IRouteDeviationRepository
  ) {}

  async execute(rideId: string): Promise<SafetyScoreResult> {
    const deviationCount = await this._routeDeviationRepository.countByRideId(
      rideId
    );

    let score = 100;
    score -= deviationCount * 10;

    score = Math.max(0, Math.min(100, score));

    return {
      score,
      deviationCount,
    };
  }
}
