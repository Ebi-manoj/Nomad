import { HttpStatusCode } from 'axios';
import { ApiDTO } from '../../helpers/implementation/apiDTO';
import { HttpRequest } from '../../helpers/implementation/httpRequest';
import { HttpResponse } from '../../helpers/implementation/httpResponse';
import { ICreateSubscriptionCheckoutSessionUseCase } from '../../../../application/usecases/User/subscription/ICreateSubscriptionCheckoutSession';
import { Unauthorized } from '../../../../domain/errors/CustomError';
import { BillingCycle, SubscriptionTier } from '../../../../domain/enums/subscription';

export class SubscriptionController {
  constructor(
    private readonly createCheckoutSessionUseCase: ICreateSubscriptionCheckoutSessionUseCase
  ) {}

  async createCheckoutSession(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const { tier, billingCycle, trialPeriodDays, metadata } = (httpRequest.body || {}) as {
      tier: SubscriptionTier;
      billingCycle: BillingCycle;
      trialPeriodDays?: number;
      metadata?: Record<string, string>;
    };

    const result = await this.createCheckoutSessionUseCase.execute({
      userId,
      tier,
      billingCycle,
      trialPeriodDays,
      metadata,
    });

    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatusCode.Ok, response);
  }
}
