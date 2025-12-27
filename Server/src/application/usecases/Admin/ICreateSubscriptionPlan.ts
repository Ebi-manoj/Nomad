import {
  CreateSubscriptionPlanDTO,
  SubscriptionPlanDTO,
} from '../../../domain/dto/adminSubscription';

export interface ICreateSubscriptionPlanUseCase {
  execute(data: CreateSubscriptionPlanDTO): Promise<SubscriptionPlanDTO>;
}
