import { FREE_TIER_COST_SHARING } from '../../domain/enums/Constants';
import {
  CustomCostSharingNotEligible,
  JoinRequestLimitExceeded,
  RideAcceptanceLimitExceeded,
} from '../../domain/errors/SubscriptionError';
import { IJoinRequestRepository } from '../repositories/IJoinRequestsRepository';
import { ISubscriptionRepository } from '../repositories/ISubscriptionRepository';
import { ISubscriptionUsageService } from './ISubscriptionUsageService';
import { ISubscriptionValidator } from './ISubscriptionValidator';
import { SubscriptionService } from './SubscriptionService';

export class SubscriptionValidator
  extends SubscriptionService
  implements ISubscriptionValidator
{
  constructor(
    subscriptionRepo: ISubscriptionRepository,
    private readonly _joinRequestRepo: IJoinRequestRepository,
    private readonly _usageService: ISubscriptionUsageService
  ) {
    super(subscriptionRepo);
  }

  async validateJoinRequest(hikeId: string, userId: string): Promise<void> {
    const { features } = await this.getActiveSubscription(userId);

    const limit = features.getMaxJoinRequestsPerRide();
    if (limit == null) return;

    const joinReqCount = await this._joinRequestRepo.findRequestCountOfHike(
      hikeId
    );
    if (joinReqCount >= limit) throw new JoinRequestLimitExceeded();
  }

  async validateRideAcceptance(userId: string): Promise<void> {
    const { features } = await this.getActiveSubscription(userId);
    const limit = features.getMaxRideAcceptancesPerMonth();
    if (limit == null) return;
    const usage = await this._usageService.getUsage(userId);

    const currentUsage = usage.getRideAcceptancesCount() ?? 0;
    if (currentUsage >= limit) throw new RideAcceptanceLimitExceeded();
  }
  async validateCreateRide(costSharing: number, userId: string): Promise<void> {
    const { features } = await this.getActiveSubscription(userId);
    if (
      !features.hasCustomCostSharing() &&
      costSharing !== FREE_TIER_COST_SHARING
    )
      throw new CustomCostSharingNotEligible();

    await this.validateRideAcceptance(userId);
  }
}
