import { SubscriptionPlanDTO } from '../../../../domain/dto/adminSubscription';

export interface IGetActivePlansUseCase {
  execute(): Promise<SubscriptionPlanDTO[]>;
}
