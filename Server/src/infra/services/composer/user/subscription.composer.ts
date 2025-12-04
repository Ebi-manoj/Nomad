import { MongoUserRepository } from '../../../repositories/UserRepository';
import { StripePaymentService } from '../../PaymentService';
import { CreateSubscriptionCheckoutSessionUseCase } from '../../../../application/usecases/User/subscription/CreateSubscriptionCheckoutSessionUseCase';
import { SubscriptionController } from '../../../../interfaces/http/controllers/subscription/subscription.controller';
import { ISubscriptionController } from '../../../../interfaces/http/controllers/ISubscriptionController';
import { stripePriceConfig } from '../../../providers/StripePriceConfig';

export function subscriptionComposer(): ISubscriptionController {
  const users = new MongoUserRepository();
  const payments = new StripePaymentService();

  const createSession = new CreateSubscriptionCheckoutSessionUseCase(
    users,
    payments,
    stripePriceConfig
  );

  return new SubscriptionController(createSession);
}
