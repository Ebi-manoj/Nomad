import { HttpStatusCode } from 'axios';
import { ApiDTO } from '../../helpers/implementation/apiDTO';
import { HttpRequest } from '../../helpers/implementation/httpRequest';
import { HttpResponse } from '../../helpers/implementation/httpResponse';
import { ICreateSubscriptionCheckoutSessionUseCase } from '../../../../application/usecases/User/subscription/ICreateSubscriptionCheckoutSession';
import { Unauthorized } from '../../../../domain/errors/CustomError';

export class SubscriptionController {
  constructor(
    private readonly createCheckoutSessionUseCase: ICreateSubscriptionCheckoutSessionUseCase
  ) {}

  async createCheckoutSession(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const { priceId, successUrl, cancelUrl, trialPeriodDays, metadata } =
      (httpRequest.body || {}) as {
        priceId: string;
        successUrl: string;
        cancelUrl: string;
        trialPeriodDays?: number;
        metadata?: Record<string, string>;
      };

    const result = await this.createCheckoutSessionUseCase.execute({
      userId,
      priceId,
      successUrl,
      cancelUrl,
      trialPeriodDays,
      metadata,
    });

    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatusCode.Ok, response);
  }
}
