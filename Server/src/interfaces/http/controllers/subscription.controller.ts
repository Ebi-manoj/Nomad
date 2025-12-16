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
import { IGetActivePlansUseCase } from '../../../application/usecases/User/subscription/IGetActivePlans';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';

export class SubscriptionController implements ISubscriptionController {
  constructor(
    private readonly _createCheckoutSessionUseCase: ICreateSubscriptionCheckoutSessionUseCase,
    private readonly _handleWebhookUseCase: IHandleSubscriptionWebhookUseCase,
    private readonly _verifySubscriptionUseCase: IVerifySubscriptionUseCase,
    private readonly _getSubscriptionUseCase: IGetSubscriptionDetailsUseCase,
    private readonly _getActivePlansUseCase: IGetActivePlansUseCase
  ) {}

  async getActivePlans(httpRequest: HttpRequest): Promise<HttpResponse> {
    const result = await this._getActivePlansUseCase.execute();
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async createCheckoutSession(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const { planId, tier, billingCycle, trialPeriodDays, metadata } =
      (httpRequest.body || {}) as {
        planId: string;
        tier: SubscriptionTier;
        billingCycle: BillingCycle;
        trialPeriodDays?: number;
        metadata?: Record<string, string>;
      };

    const result = await this._createCheckoutSessionUseCase.execute({
      planId,
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

    await this._handleWebhookUseCase.execute(payload, signature as string);

    const response = ApiResponse.success({ received: true });
    return new HttpResponse(HttpStatusCode.Ok, response);
  }

  async verifySubscription(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();
    const query = httpRequest.query as { session_id: string };
    const sessionId = query.session_id || '';

    const result = await this._verifySubscriptionUseCase.execute({
      userId,
      sessionId,
    });
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatusCode.Ok, response);
  }
  async getSubscription(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const result = await this._getSubscriptionUseCase.execute(userId);
    const response = ApiResponse.success(result);

    return new HttpResponse(HttpStatusCode.Ok, response);
  }
}
