import { FreeTierCannotBeDeletd } from '../../../domain/errors/SubscriptionAdmin';
import { SubscriptionPlanNotFound } from '../../../domain/errors/SubscriptionError';
import { ISubscriptionPlanRepository } from '../../repositories/ISubscriptionPlanRepository';
import { IDeleteSubscriptionPlanUseCase } from './IDeleteSubscriptionPlan';

export class DeleteSubscriptionPlanUseCase
  implements IDeleteSubscriptionPlanUseCase
{
  constructor(
    private readonly _subscriptionPlans: ISubscriptionPlanRepository
  ) {}

  async execute(planId: string): Promise<{ planId: string; success: boolean }> {
    const plan = await this._subscriptionPlans.findById(planId);
    if (!plan) throw new SubscriptionPlanNotFound();

    if (plan.getIsDefault()) throw new FreeTierCannotBeDeletd();
    plan.delete();
    await this._subscriptionPlans.update(planId, plan);
    return {
      planId,
      success: true,
    };
  }
}
