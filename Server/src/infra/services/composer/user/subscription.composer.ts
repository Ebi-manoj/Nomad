import { MongoUserRepository } from '../../../repositories/UserRepository';
import { StripePaymentService } from '../../PaymentService';
import { CreateSubscriptionCheckoutSessionUseCase } from '../../../../application/usecases/User/subscription/CreateSubscriptionCheckoutSessionUseCase';
import { ISubscriptionController } from '../../../../interfaces/http/controllers/ISubscriptionController';
import { stripePriceConfig } from '../../../providers/StripePriceConfig';
import { SubscriptionController } from '../../../../interfaces/http/controllers/subscription.controller';
import { HandleSubscriptionWebhookUseCase } from '../../../../application/usecases/User/subscription/HandleSubscriptionWebhookUseCase';
import { SubscriptionRepository } from '../../../repositories/SubscriptionRepository';
import { RedisCheckoutSessionRepository } from '../../../repositories/RedisCheckoutSessionRepository';
import { VerifySubscriptionUseCase } from '../../../../application/usecases/User/subscription/VerifySubscriptionUseCase';
import { GetSubscriptionDetailUseCase } from '../../../../application/usecases/User/subscription/GetSubscriptionDetails';
import { SubscriptionUsageService } from '../../../../application/services/SubscriptionUsageService';
import { SubscriptionUsageRepository } from '../../../repositories/SubscriptionUsageRepository';
import { SubscriptionService } from '../../../../application/services/SubscriptionService';
import { GetActivePlansUseCase } from '../../../../application/usecases/User/subscription/GetActivePlans';
import { SubscriptionPlanRepository } from '../../../repositories/SubscriptionPlanRepository';
import { CreateSubscriptionUseCase } from '../../../../application/usecases/User/subscription/CreateSubscriptionUseCase';
import { ChangeSubscriptionPlanUseCase } from '../../../../application/usecases/User/subscription/ChangeSubscriptionPlanUseCase';

export function subscriptionComposer(): ISubscriptionController {
  const users = new MongoUserRepository();
  const payments = new StripePaymentService();
  const subscriptions = new SubscriptionRepository();
  const checkoutSessions = new RedisCheckoutSessionRepository();
  const usageRepository = new SubscriptionUsageRepository();
  const subscriptionPlanRepo = new SubscriptionPlanRepository();
  const subscriptionPlans = new SubscriptionPlanRepository();

  const usageService = new SubscriptionUsageService(usageRepository);
  const subService = new SubscriptionService(subscriptions, subscriptionPlans);

  const createSession = new CreateSubscriptionCheckoutSessionUseCase(
    users,
    payments,
    stripePriceConfig,
    checkoutSessions,
    subscriptions,
    subscriptionPlanRepo
  );

  const createSubscriptionUseCase = new CreateSubscriptionUseCase(
    subscriptionPlanRepo,
    subscriptions,
    checkoutSessions
  );

  const handleWebhook = new HandleSubscriptionWebhookUseCase(
    payments,
    createSubscriptionUseCase,
    subscriptions,
    subscriptionPlanRepo
  );
  const verifySubscriptionUseCase = new VerifySubscriptionUseCase(
    checkoutSessions,
    subscriptions
  );

  const getSubscriptionUseCase = new GetSubscriptionDetailUseCase(
    usageService,
    subService
  );

  const getActiveplanUseCase = new GetActivePlansUseCase(subscriptionPlanRepo);

  const changePlanUseCase = new ChangeSubscriptionPlanUseCase(
    users,
    payments,
    subscriptions,
    subscriptionPlanRepo
  );

  return new SubscriptionController(
    createSession,
    handleWebhook,
    verifySubscriptionUseCase,
    getSubscriptionUseCase,
    getActiveplanUseCase,
    changePlanUseCase
  );
}
