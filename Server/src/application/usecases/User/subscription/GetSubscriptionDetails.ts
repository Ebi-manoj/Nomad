import { GetSubscriptionDetailsResDTO } from '../../../../domain/dto/SubscriptionDTO';
import { SubscriptionTier } from '../../../../domain/enums/subscription';
import { SubscriptionMapper } from '../../../mappers/SubscriptionMapper';
import { ISubscriptionRepository } from '../../../repositories/ISubscriptionRepository';
import { ISubscriptionUsageService } from '../../../services/ISubscriptionUsageService';
import { IGetSubscriptionDetailsUseCase } from './IGetSubscriptionDetails';

export class GetSubscriptionDetailUseCase
  implements IGetSubscriptionDetailsUseCase
{
  constructor(
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly SubscriptionUsageService: ISubscriptionUsageService
  ) {}
  async execute(userId: string): Promise<GetSubscriptionDetailsResDTO> {
    const usage = await this.SubscriptionUsageService.getUsage(userId);

    const subscription = await this.subscriptionRepository.findActiveByUserId(
      userId
    );

    return {
      tier: subscription ? subscription.getTier() : SubscriptionTier.FREE,
      subscription: subscription ? SubscriptionMapper(subscription) : null,
      subscriptionUsage: usage,
    };
  }
}
