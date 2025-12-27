import {
  EditSubscriptionPlanDTO,
  SubscriptionPlanDTO,
} from '../../../domain/dto/adminSubscription';

export interface IEditSubscriptionPlanUseCase {
  execute(data: EditSubscriptionPlanDTO): Promise<SubscriptionPlanDTO>;
}
