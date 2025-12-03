import { Types } from 'mongoose';
import { SubscriptionUsage } from '../../domain/entities/SubscriptionUsage';
import { ISubscriptionUsageDocument } from '../database/SubscriptionUsage.model';
import { IMapper } from './IMapper';

export const subscriptionUsageMapper: IMapper<
  SubscriptionUsage,
  ISubscriptionUsageDocument
> = {
  toDomain(persistence: ISubscriptionUsageDocument): SubscriptionUsage {
    return new SubscriptionUsage({
      id: persistence._id.toString(),
      userId: persistence.userId.toString(),
      subscriptionId: persistence.subscriptionId.toString(),
      month: persistence.month,
      joinRequestsCount: persistence.joinRequestsCount,
      rideAcceptancesCount: persistence.rideAcceptancesCount,
      createdAt: persistence.createdAt,
      updatedAt: persistence.updatedAt,
    });
  },

  toPersistence(domain: SubscriptionUsage): Partial<ISubscriptionUsageDocument> {
    return {
      userId: new Types.ObjectId(domain.getUserId()),
      subscriptionId: new Types.ObjectId(domain.getSubscriptionId()),
      month: domain.getMonth(),
      joinRequestsCount: domain.getJoinRequestsCount(),
      rideAcceptancesCount: domain.getRideAcceptancesCount(),
    };
  },
};
