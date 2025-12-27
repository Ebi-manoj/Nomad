import {
  EditSubscriptionPlanDTO,
  SubscriptionPlanDTO,
} from '../../../domain/dto/adminSubscription';
import { SubscriptionFeatures } from '../../../domain/entities/Subscription';
import { UpdateFailed } from '../../../domain/errors/CustomError';
import { SubscriptionPlanNotFound } from '../../../domain/errors/SubscriptionError';
import { SubscriptionPlanMapper } from '../../mappers/SubscriptionPlanMapper';
import { ISubscriptionPlanRepository } from '../../repositories/ISubscriptionPlanRepository';
import { IEditSubscriptionPlanUseCase } from './IEditSubscriptionPlan';

export class EditSubscriptionPlanUseCase
  implements IEditSubscriptionPlanUseCase
{
  constructor(
    private readonly _subscriptionPlans: ISubscriptionPlanRepository
  ) {}

  async execute(data: EditSubscriptionPlanDTO): Promise<SubscriptionPlanDTO> {
    const plan = await this._subscriptionPlans.findById(data.id);
    if (!plan) throw new SubscriptionPlanNotFound();

    const features = new SubscriptionFeatures(
      data.features.maxJoinRequestsPerRide,
      data.features.maxRideAcceptancesPerMonth,
      data.features.platformFeePercentage,
      data.features.verificationBadge,
      data.features.priorityInList,
      data.features.customCostSharing
    );

    plan.setTier(data.tier);
    plan.setDescription(data.description);
    plan.setBadgeColor(data.badgeColor);
    plan.setDisplayOrder(data.displayOrder);
    plan.setFeatures(features);
    if (!plan.getIsDefault()) {
      plan.setPricing(data.price);
      plan.setPopular(data.isPopular);
    }
    const updated = await this._subscriptionPlans.update(
      plan.getId() as string,
      plan
    );
    if (!updated) throw new UpdateFailed();
    return SubscriptionPlanMapper.toJson(updated);
  }
}
