import { SubscriptionPlanDTO } from '../../../../domain/dto/adminSubscription';
import { SubscriptionPlanMapper } from '../../../mappers/SubscriptionPlanMapper';
import { ISubscriptionPlanRepository } from '../../../repositories/ISubscriptionPlanRepository';
import { IGetActivePlansUseCase } from './IGetActivePlans';

export class GetActivePlansUseCase implements IGetActivePlansUseCase {
  constructor(
    private readonly _subscriptionPlans: ISubscriptionPlanRepository
  ) {}
  async execute(): Promise<SubscriptionPlanDTO[]> {
    const plans = await this._subscriptionPlans.findAllActive();
    return plans.map(SubscriptionPlanMapper.toJson);
  }
}
