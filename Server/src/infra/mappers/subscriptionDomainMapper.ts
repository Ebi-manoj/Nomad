import { Types } from 'mongoose';
import {
  Subscription,
  SubscriptionFeatures,
} from '../../domain/entities/Subscription';
import { ISubscriptionDocument } from '../database/Subscription.model';
import { IMapper } from './IMapper';

export const subscriptionMapper: IMapper<Subscription, ISubscriptionDocument> =
  {
    toDomain(persistence: ISubscriptionDocument): Subscription {
      return new Subscription({
        id: persistence._id.toString(),
        userId: persistence.userId.toString(),
        badgeColor: persistence.badgeColor,
        planId: persistence.planId.toString(),
        tier: persistence.tier,
        billingCycle: persistence.billingCycle,
        status: persistence.status,
        startDate: persistence.startDate,
        endDate: persistence.endDate,
        autoRenew: persistence.autoRenew,
        price: persistence.price,
        currency: persistence.currency,
        stripeSubscriptionId: persistence.stripeSubscriptionId || undefined,
        stripeCustomerId: persistence.stripeCustomerId || undefined,
        stripePriceId: persistence.stripePriceId || undefined,
        features: new SubscriptionFeatures(
          persistence.features.maxJoinRequestsPerRide ?? null,
          persistence.features.maxRideAcceptancesPerMonth ?? null,
          persistence.features.platformFeePercentage ?? 0,
          !!persistence.features.verificationBadge,
          !!persistence.features.priorityInList,
          !!persistence.features.customCostSharing
        ),
        createdAt: persistence.createdAt,
        updatedAt: persistence.updatedAt,
        cancelledAt: persistence.cancelledAt || undefined,
      });
    },

    toPersistence(domain: Subscription): Partial<ISubscriptionDocument> {
      return {
        userId: new Types.ObjectId(domain.getUserId()),
        planId: new Types.ObjectId(domain.getPlanId()),
        tier: domain.getTier(),
        badgeColor: domain.getBadgeColor(),
        billingCycle: domain.getBillingCycle(),
        status: domain.getStatus(),
        startDate: domain.getStartDate(),
        endDate: domain.getEndDate(),
        autoRenew: domain.isAutoRenew(),
        price: domain.getPrice(),
        currency: domain.getCurrency(),
        stripeSubscriptionId: domain.getStripeSubscriptionId() || null,
        stripeCustomerId: domain.getStripeCustomerId() || null,
        stripePriceId: domain.getStripePriceId() || null,
        features: domain.getFeatures()?.toJson(),
        cancelledAt: domain.getCancelledAt() || null,
      };
    },
  };
