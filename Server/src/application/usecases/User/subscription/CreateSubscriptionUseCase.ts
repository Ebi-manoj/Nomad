import { CreateSubscriptionReqDTO } from '../../../../domain/dto/SubscriptionDTO';
import { Subscription } from '../../../../domain/entities/Subscription';
import { ICreateSubscriptionUseCase } from './ICreateSubscription';

export class CreateSubscriptionUseCase implements ICreateSubscriptionUseCase {
  execute(data: CreateSubscriptionReqDTO): Promise<void> {}
}
