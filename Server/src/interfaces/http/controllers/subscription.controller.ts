import { HttpStatusCode } from 'axios';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { ICreateSubscriptionCheckoutSessionUseCase } from '../../../application/usecases/User/subscription/ICreateSubscriptionCheckoutSession';
import { Unauthorized } from '../../../domain/errors/CustomError';
import {
  BillingCycle,
  SubscriptionTier,
} from '../../../domain/enums/subscription';
import { ISubscriptionController } from './ISubscriptionController';
import { IHandleSubscriptionWebhookUseCase } from '../../../application/usecases/User/subscription/IHandleSubscriptionWebhookUseCase';
import { IVerifySubscriptionUseCase } from '../../../application/usecases/User/subscription/IVerifySubscriptionUseCase';
import { IGetSubscriptionDetailsUseCase } from '../../../application/usecases/User/subscription/IGetSubscriptionDetails';
import { ApiResponse } from '../helpers/implementation/apiResponse';

export class SubscriptionController implements ISubscriptionController {
  constructor(
    private readonly createCheckoutSessionUseCase: ICreateSubscriptionCheckoutSessionUseCase,
    private readonly handleWebhookUseCase: IHandleSubscriptionWebhookUseCase,
    private readonly verifySubscriptionUseCase: IVerifySubscriptionUseCase,
    private readonly getSubscriptionUseCase: IGetSubscriptionDetailsUseCase
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

    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatusCode.Ok, response);
  }

  async handleWebhook(httpRequest: HttpRequest): Promise<HttpResponse> {
    // Stripe signature header
    const headers = (httpRequest.header || {}) as Record<string, unknown>;
    const signature =
      headers['stripe-signature'] || headers['Stripe-Signature'];

    const payload = httpRequest.body as Buffer;

    await this.handleWebhookUseCase.execute(payload, signature as string);

    const response = ApiResponse.success({ received: true });
    return new HttpResponse(HttpStatusCode.Ok, response);
  }

  async verifySubscription(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();
    const q = httpRequest.query as { session_id: string };
    const sessionId = q.session_id || '';

    const result = await this.verifySubscriptionUseCase.execute({
      userId,
      sessionId,
    });
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatusCode.Ok, response);
  }
  async getSubscription(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const result = await this.getSubscriptionUseCase.execute(userId);
    const response = ApiResponse.success(result);

    return new HttpResponse(HttpStatusCode.Ok, response);
  }
}
