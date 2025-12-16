import { CreateSubscriptionReqDTO } from '../../../../domain/dto/SubscriptionDTO';

export interface ICreateSubscriptionUseCase {
  execute(data: CreateSubscriptionReqDTO): Promise<void>;
}
