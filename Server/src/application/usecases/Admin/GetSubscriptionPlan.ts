import { SubscriptionPlanDTO } from '../../../domain/dto/adminSubscription';
import { SubscriptionPlanMapper } from '../../mappers/SubscriptionPlanMapper';
import { ISubscriptionPlanRepository } from '../../repositories/ISubscriptionPlanRepository';
import { IGetSubscriptionPlanUseCase } from './IGetSubscriptionPlans';

export class GetSubscriptionPlanUseCase implements IGetSubscriptionPlanUseCase {
  constructor(
    private readonly _subscriptionPlans: ISubscriptionPlanRepository
  ) {}

  async execute(): Promise<SubscriptionPlanDTO[]> {
    const plan = await this._subscriptionPlans.findAll();
    return plan.map(SubscriptionPlanMapper.toJson);
  }
}
