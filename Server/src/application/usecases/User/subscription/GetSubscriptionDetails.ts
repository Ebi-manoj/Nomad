import { GetSubscriptionDetailsResDTO } from '../../../../domain/dto/SubscriptionDTO';
import { SubscriptionTier } from '../../../../domain/enums/subscription';
import { SubscriptionMapper } from '../../../mappers/SubscriptionMapper';
import { ISubscriptionRepository } from '../../../repositories/ISubscriptionRepository';
import { ISubscriptionService } from '../../../services/ISubscriptionService';
import { ISubscriptionUsageService } from '../../../services/ISubscriptionUsageService';
import { IGetSubscriptionDetailsUseCase } from './IGetSubscriptionDetails';

export class GetSubscriptionDetailUseCase
  implements IGetSubscriptionDetailsUseCase
{
  constructor(
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly SubscriptionUsageService: ISubscriptionUsageService,
    private readonly subscriptionService: ISubscriptionService
  ) {}
  async execute(userId: string): Promise<GetSubscriptionDetailsResDTO> {
    const usage = await this.SubscriptionUsageService.getUsage(userId);

    const { subscription, ...subscriptionData } =
      await this.subscriptionService.getActiveSubscription(userId);

    return {
      tier: subscriptionData.tier,
      subscription: subscription ? SubscriptionMapper(subscription) : null,
      features: subscriptionData.features,
      subscriptionUsage: usage,
    };
  }
}
