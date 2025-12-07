import { GetSubscriptionDetailsResDTO } from '../../../../domain/dto/SubscriptionDTO';

export interface IGetSubscriptionDetailsUseCase {
  execute(userId: string): Promise<GetSubscriptionDetailsResDTO>;
}
