import { SubscriptionPlan } from '../../domain/entities/SubscriptionPlan';
import { ISubscriptionPlanDocument } from '../database/SubscriptionPlan.model';
import { IMapper } from './IMapper';
import { SubscriptionFeatures } from '../../domain/entities/Subscription';

export const subscriptionPlanMapper: IMapper<
  SubscriptionPlan,
  ISubscriptionPlanDocument
> = {
  toDomain(doc: ISubscriptionPlanDocument): SubscriptionPlan {
    const features = new SubscriptionFeatures(
      doc.features.maxJoinRequestsPerRide,
      doc.features.maxRideAcceptancesPerMonth,
      doc.features.platformFeePercentage,
      doc.features.verificationBadge,
      doc.features.priorityInList,
      doc.features.customCostSharing
    );
    return new SubscriptionPlan({
      id: doc._id.toString(),
      tier: doc.tier,
      description: doc.description,
      badgeColor: doc.badgeColor ?? '#16a34a',
      features,
      price: doc.price,
      stripeId: doc.stripeId,
      isActive: doc.isActive,
      isDefault: doc.isDefault,
      isPopular: doc.isPopular,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  },

  toPersistence(domain: SubscriptionPlan): Partial<ISubscriptionPlanDocument> {
    const f = domain.getFeatures();
    return {
      tier: domain.getTier(),
      description: domain.getDescription(),
      badgeColor: domain.getBadgeColor(),
      features: {
        maxJoinRequestsPerRide: f.getMaxJoinRequestsPerRide(),
        maxRideAcceptancesPerMonth: f.getMaxRideAcceptancesPerMonth(),
        platformFeePercentage: f.getPlatformFeePercentage(),
        verificationBadge: f.hasVerificationBadge(),
        priorityInList: f.hasPriorityInList(),
        customCostSharing: f.hasCustomCostSharing(),
      },
      price: domain.getPrice(),
      stripeId: domain.getStripeId(),
      isActive: domain.getIsActive(),
      isPopular: domain.getIsPopular(),
    };
  },
};
