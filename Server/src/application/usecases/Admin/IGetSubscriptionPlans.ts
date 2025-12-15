import { SubscriptionPlanDTO } from '../../../domain/dto/adminSubscription';

export interface IGetSubscriptionPlanUseCase {
  execute(): Promise<SubscriptionPlanDTO[]>;
}
