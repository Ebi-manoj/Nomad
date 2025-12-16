import { SubscriptionPlanDTO } from '../../domain/dto/adminSubscription';
import { SubscriptionPlan } from '../../domain/entities/SubscriptionPlan';

export class SubscriptionPlanMapper {
  static toJson(sub: SubscriptionPlan): SubscriptionPlanDTO {
    return {
      id: sub.getId() as string,
      tier: sub.getTier(),
      description: sub.getDescription(),
      features: sub.getFeatures().toJson(),
      price: sub.getPrice(),
      isActive: sub.getIsActive(),
      isPopular: sub.getIsPopular(),
      createdAt: sub.getCreatedAt(),
      updatedAt: sub.getUpdatedAt(),
    };
  }
}
