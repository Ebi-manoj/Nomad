import { SubscriptionResDTO } from '../../domain/dto/SubscriptionDTO';
import {
  Subscription,
  SubscriptionFeatures,
} from '../../domain/entities/Subscription';

export function SubscriptionMapper(sub: Subscription): SubscriptionResDTO {
  return {
    id: sub.getId()!,
    userId: sub.getUserId(),
    tier: sub.getTier(),
    billingCycle: sub.getBillingCycle(),
    stripeCustomerId: sub.getStripeCustomerId(),
    stripeSubscriptionId: sub.getStripeSubscriptionId(),
    startDate: new Date(sub.getStartDate()),
    endDate: new Date(sub.getEndDate()),
    autoRenew: sub.isAutoRenew(),
    price: sub.getPrice(),
    currency: sub.getCurrency(),
    cancelledAt: sub.getCancelledAt(),
    createdAt: sub.getCreatedAt(),
    features: sub.getFeatures(),
  };
}
