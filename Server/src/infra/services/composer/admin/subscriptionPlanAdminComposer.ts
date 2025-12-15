import { CreateSubscriptionPlanUseCase } from '../../../../application/usecases/Admin/CreateSubscriptionPlan';
import { GetSubscriptionPlanUseCase } from '../../../../application/usecases/Admin/GetSubscriptionPlan';
import { IAdminSubscriptionPlanController } from '../../../../interfaces/http/controllers/IAdminSubscriptionPlanController';
import { AdminSubscriptionPlanController } from '../../../../interfaces/http/controllers/adminSubscriptionPlan.controller';
import { SubscriptionPlanRepository } from '../../../repositories/SubscriptionPlanRepository';
import { StripePaymentService } from '../../../services/PaymentService';

export function subscriptionPlanAdminComposer(): IAdminSubscriptionPlanController {
  const planRepo = new SubscriptionPlanRepository();
  const paymentService = new StripePaymentService();
  const createUseCase = new CreateSubscriptionPlanUseCase(
    planRepo,
    paymentService
  );

  const getPlanUseCase = new GetSubscriptionPlanUseCase(planRepo);
  return new AdminSubscriptionPlanController(createUseCase, getPlanUseCase);
}
