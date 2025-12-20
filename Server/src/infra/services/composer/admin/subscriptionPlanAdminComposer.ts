import { CreateSubscriptionPlanUseCase } from '../../../../application/usecases/Admin/CreateSubscriptionPlan';
import { DeleteSubscriptionPlanUseCase } from '../../../../application/usecases/Admin/DeleteSubscriptionPlan';
import { EditSubscriptionPlanUseCase } from '../../../../application/usecases/Admin/EditSubscriptionPlan';
import { GetSubscriptionPlanUseCase } from '../../../../application/usecases/Admin/GetSubscriptionPlan';
import { ToggleSubscriptionStatusUseCase } from '../../../../application/usecases/Admin/ToggleSubscriptionStatus';
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

  const editPlanusecase = new EditSubscriptionPlanUseCase(planRepo);

  const togglePlanUseCase = new ToggleSubscriptionStatusUseCase(planRepo);

  const deletePlanUseCase = new DeleteSubscriptionPlanUseCase(planRepo);

  const getPlanUseCase = new GetSubscriptionPlanUseCase(planRepo);
  return new AdminSubscriptionPlanController(
    createUseCase,
    getPlanUseCase,
    editPlanusecase,
    togglePlanUseCase,
    deletePlanUseCase
  );
}
