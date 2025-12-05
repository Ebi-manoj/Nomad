import { HttpStatusCode } from 'axios';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { ICreateSubscriptionCheckoutSessionUseCase } from '../../../application/usecases/User/subscription/ICreateSubscriptionCheckoutSession';
import { Unauthorized } from '../../../domain/errors/CustomError';
import {
  BillingCycle,
  SubscriptionTier,
} from '../../../domain/enums/subscription';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { ISubscriptionController } from './ISubscriptionController';
import { IHandleSubscriptionWebhookUseCase } from '../../../application/usecases/User/subscription/IHandleSubscriptionWebhookUseCase';

export class SubscriptionController implements ISubscriptionController {
  constructor(
    private readonly createCheckoutSessionUseCase: ICreateSubscriptionCheckoutSessionUseCase,
    private readonly handleWebhookUseCase: IHandleSubscriptionWebhookUseCase
  ) {}

  async createCheckoutSession(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const { tier, billingCycle, trialPeriodDays, metadata } =
      (httpRequest.body || {}) as {
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

  async handleWebhook(httpRequest: HttpRequest): Promise<HttpResponse> {
    // Stripe signature header
    const headers = (httpRequest.header || {}) as Record<string, any>;
    const signature = headers['stripe-signature'] || headers['Stripe-Signature'];

    // Body is expected to be raw (Buffer) when using express.raw on the route
    const payload = httpRequest.body as any;

    await this.handleWebhookUseCase.execute(payload, signature);

    const response = ApiDTO.success({ received: true });
    return new HttpResponse(HttpStatusCode.Ok, response);
  }
}
