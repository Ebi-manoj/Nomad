import { Types } from 'mongoose';
import { Subscription } from '../../domain/entities/Subscription';
import { ISubscriptionDocument } from '../database/Subscription.model';
import { IMapper } from './IMapper';

export const subscriptionMapper: IMapper<Subscription, ISubscriptionDocument> = {
  toDomain(persistence: ISubscriptionDocument): Subscription {
    return new Subscription({
      id: persistence._id.toString(),
      userId: persistence.userId.toString(),
      tier: persistence.tier,
      billingCycle: persistence.billingCycle,
      status: persistence.status,
      startDate: persistence.startDate,
      endDate: persistence.endDate,
      autoRenew: persistence.autoRenew,
      price: persistence.price,
      currency: persistence.currency,
      createdAt: persistence.createdAt,
      updatedAt: persistence.updatedAt,
      cancelledAt: persistence.cancelledAt || undefined,
    });
  },

  toPersistence(domain: Subscription): Partial<ISubscriptionDocument> {
    return {
      userId: new Types.ObjectId(domain.getUserId()),
      tier: domain.getTier(),
      billingCycle: domain.getBillingCycle(),
      status: domain.getStatus(),
      startDate: domain.getStartDate(),
      endDate: domain.getEndDate(),
      autoRenew: domain.isAutoRenew(),
      price: domain.getPrice(),
      currency: domain.getCurrency(),
      cancelledAt: domain.getCancelledAt() || null,
    };
  },
};
