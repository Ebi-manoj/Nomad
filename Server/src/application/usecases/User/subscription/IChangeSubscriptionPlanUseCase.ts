import { BillingCycle } from '../../../../domain/enums/subscription';

export interface ChangeSubscriptionPlanDTO {
  userId: string;
  newPlanId: string;
  billingCycle: BillingCycle;
}

export interface IChangeSubscriptionPlanUseCase {
  execute(
    data: ChangeSubscriptionPlanDTO
  ): Promise<{ success: boolean; effectiveDate: Date }>;
}
