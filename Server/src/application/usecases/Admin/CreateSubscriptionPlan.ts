import {
  CreateSubscriptionPlanDTO,
  SubscriptionPlanDTO,
} from '../../../domain/dto/adminSubscription';
import { SubscriptionFeatures } from '../../../domain/entities/Subscription';
import { SubscriptionPlan } from '../../../domain/entities/SubscriptionPlan';
import {
  FREE_PLATFORM_FEE,
  MAX_JOIN_REQUEST,
  MAX_RIDE_ACCEPTANCE,
} from '../../../domain/enums/Constants';
import { SubscriptionPlanExist } from '../../../domain/errors/SubscriptionAdmin';
import { SubscriptionPlanMapper } from '../../mappers/SubscriptionPlanMapper';
import { ISubscriptionPlanRepository } from '../../repositories/ISubscriptionPlanRepository';
import { IPaymentService } from '../../services/IPaymentService';
import { ICreateSubscriptionPlanUseCase } from './ICreateSubscriptionPlan';

export class CreateSubscriptionPlanUseCase
  implements ICreateSubscriptionPlanUseCase
{
  constructor(
    private readonly _susbcriptionPlans: ISubscriptionPlanRepository,
    private readonly _paymentService: IPaymentService
  ) {}

  async execute(data: CreateSubscriptionPlanDTO): Promise<SubscriptionPlanDTO> {
    const exisiting = await this._susbcriptionPlans.findByTier(data.tier);
    if (exisiting) throw new SubscriptionPlanExist();

    const normalizedTier = data.tier.toUpperCase();

    const stripeProduct = await this._paymentService.createProduct({
      name: normalizedTier,
      description: data.description,
      images: [data.imageUrl],
    });

    const monthlyPrice = await this._paymentService.createPrice({
      productId: stripeProduct.id,
      unitAmount: Math.round(data.price.monthly * 100),
      recurring: {
        interval: 'month',
        intervalCount: 1,
      },
    });

    const yearlyPrice = await this._paymentService.createPrice({
      productId: stripeProduct.id,
      unitAmount: Math.round(data.price.yearly * 100),
      recurring: {
        interval: 'year',
        intervalCount: 1,
      },
    });

    const features = new SubscriptionFeatures(
      data.features.maxJoinRequestsPerRide ?? MAX_JOIN_REQUEST,
      data.features.maxRideAcceptancesPerMonth ?? MAX_RIDE_ACCEPTANCE,
      data.features.platformFeePercentage ?? FREE_PLATFORM_FEE,
      data.features.verificationBadge ?? false,
      data.features.priorityInList ?? false,
      data.features.customCostSharing ?? false
    );

    const subscriptionPlan = new SubscriptionPlan({
      tier: normalizedTier,
      description: data.description,
      features,
      price: data.price,
      stripeId: {
        monthly: monthlyPrice.id,
        yearly: yearlyPrice.id,
      },
      isPopular: data.isPopular ?? false,
      isActive: true,
    });
    const createdPlan = await this._susbcriptionPlans.create(subscriptionPlan);

    return SubscriptionPlanMapper.toJson(createdPlan);
  }
}
