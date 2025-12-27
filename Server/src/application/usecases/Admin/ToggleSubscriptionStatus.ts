import { SubscriptionPlanNotFound } from '../../../domain/errors/SubscriptionError';
import { ISubscriptionPlanRepository } from '../../repositories/ISubscriptionPlanRepository';
import { IToggleSubscriptionStatusUseCase } from './IToggleSubscriptionStatus';

export class ToggleSubscriptionStatusUseCase
  implements IToggleSubscriptionStatusUseCase
{
  constructor(
    private readonly _susbcriptionPlansRepo: ISubscriptionPlanRepository
  ) {}

  async execute(
    planId: string
  ): Promise<{ planId: string; isActive: boolean }> {
    const plan = await this._susbcriptionPlansRepo.findById(planId);
    if (!plan) throw new SubscriptionPlanNotFound();
    plan.toggleIsActive();
    await this._susbcriptionPlansRepo.update(plan.getId() as string, plan);
    return {
      planId: plan.getId() as string,
      isActive: plan.getIsActive(),
    };
  }
}
