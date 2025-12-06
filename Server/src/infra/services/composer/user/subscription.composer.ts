import { MongoUserRepository } from '../../../repositories/UserRepository';
import { StripePaymentService } from '../../PaymentService';
import { CreateSubscriptionCheckoutSessionUseCase } from '../../../../application/usecases/User/subscription/CreateSubscriptionCheckoutSessionUseCase';
import { ISubscriptionController } from '../../../../interfaces/http/controllers/ISubscriptionController';
import { stripePriceConfig } from '../../../providers/StripePriceConfig';
import { SubscriptionController } from '../../../../interfaces/http/controllers/subscription.controller';
import { HandleSubscriptionWebhookUseCase } from '../../../../application/usecases/User/subscription/HandleSubscriptionWebhookUseCase';
import { SubscriptionRepository } from '../../../repositories/SubscriptionRepository';
import { RedisCheckoutSessionRepository } from '../../../repositories/RedisCheckoutSessionRepository';

export function subscriptionComposer(): ISubscriptionController {
  const users = new MongoUserRepository();
  const payments = new StripePaymentService();
  const subscriptions = new SubscriptionRepository();
  const checkoutSessions = new RedisCheckoutSessionRepository();

  const createSession = new CreateSubscriptionCheckoutSessionUseCase(
    users,
    payments,
    stripePriceConfig,
    checkoutSessions
  );
  const handleWebhook = new HandleSubscriptionWebhookUseCase(
    payments,
    subscriptions,
    users
  );

  return new SubscriptionController(createSession, handleWebhook);
}
