import { IPaymentService } from '../../../services/IPaymentService';
import { IHandleSubscriptionWebhookUseCase } from './IHandleSubscriptionWebhookUseCase';
import { ISubscriptionRepository } from '../../../repositories/ISubscriptionRepository';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { ICheckoutSessionRepository } from '../../../repositories/ICheckoutSessionRepository';
import {
  CheckoutSessionData,
  TypedWebhookEvent,
} from '../../../../domain/dto/PaymentWebhookDTO';
import { ICreateSubscriptionUseCase } from './ICreateSubscription';
import { CreateSubscriptionReqDTO } from '../../../../domain/dto/SubscriptionDTO';
import { BillingCycle } from '../../../../domain/enums/subscription';

export class HandleSubscriptionWebhookUseCase
  implements IHandleSubscriptionWebhookUseCase
{
  constructor(
    private readonly _paymentService: IPaymentService,
    private readonly _createSubscriptionUseCase: ICreateSubscriptionUseCase
  ) {}

  async execute(payload: Buffer | string, signature?: string): Promise<void> {
    const { type, data } = await this.getEventAndData(payload, signature);

    // Handle events
    switch (type) {
      case 'checkout.session.completed': {
        console.log('StripeWebhook checkout.session.completed');
        await this._handleCheckoutSessionCompleted(data as CheckoutSessionData);
        break;
      }
    }
  }

  private async getEventAndData(
    payload: Buffer | string,
    signature?: string
  ): Promise<TypedWebhookEvent> {
    if (signature) {
      try {
        return await this._paymentService.constructWebhookEvent(
          payload,
          signature
        );
      } catch (err) {
        console.log('Verification failed, parsing manually', err);
      }
    }

    // Fallback: try to parse JSON and read type
    try {
      const text = Buffer.isBuffer(payload)
        ? payload.toString('utf8')
        : typeof payload === 'string'
        ? payload
        : JSON.stringify(payload);
      const parsed = JSON.parse(text);

      return {
        type: parsed?.type || 'unknown',
        data: parsed?.data?.object || parsed?.data || {},
      };
    } catch {
      return {
        type: 'unknown',
        data: {},
      };
    }
  }

  private async _handleCheckoutSessionCompleted(
    data: CheckoutSessionData
  ): Promise<void> {
    const dto: CreateSubscriptionReqDTO = {
      userId: data.metadata.userId,
      planId: data.metadata.planId,
      tier: data.metadata.tier,
      billingCycle: data.metadata.billingCycle as BillingCycle,
      startDate: new Date(data.createdAt),
      price: data.amountTotal / 100,
      currency: data.currency,
      stripePriceId: data.metadata.stripePriceId,
      stripeCustomerId: data.customerId,
      stripeSubscriptionId: data.subscriptionId,
    };
    await this._createSubscriptionUseCase.execute(dto);
  }
}
