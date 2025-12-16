import { GetSubscriptionDetailsResDTO } from '../../../../domain/dto/SubscriptionDTO';
import { SubscriptionMapper } from '../../../mappers/SubscriptionMapper';
import { ISubscriptionService } from '../../../services/ISubscriptionService';
import { ISubscriptionUsageService } from '../../../services/ISubscriptionUsageService';
import { IGetSubscriptionDetailsUseCase } from './IGetSubscriptionDetails';

export class GetSubscriptionDetailUseCase
  implements IGetSubscriptionDetailsUseCase
{
  constructor(
    private readonly _subscriptionUsageService: ISubscriptionUsageService,
    private readonly _subscriptionService: ISubscriptionService
  ) {}
  async execute(userId: string): Promise<GetSubscriptionDetailsResDTO> {
    const usage = await this._subscriptionUsageService.getUsage(userId);

    const { subscription, ...subscriptionData } =
      await this._subscriptionService.getActiveSubscription(userId);

    return {
      tier: subscriptionData.tier,
      subscription: subscription ? SubscriptionMapper(subscription) : null,
      features: subscriptionData.features,
      subscriptionUsage: usage.toJson(),
    };
  }
}
