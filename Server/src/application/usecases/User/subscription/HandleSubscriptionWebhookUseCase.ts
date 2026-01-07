import { IPaymentService } from '../../../services/IPaymentService';
import { IHandleSubscriptionWebhookUseCase } from './IHandleSubscriptionWebhookUseCase';
import {
  CheckoutSessionData,
  SubscriptionUpdatedData,
  TypedWebhookEvent,
} from '../../../../domain/dto/PaymentWebhookDTO';
import { ICreateSubscriptionUseCase } from './ICreateSubscription';
import { CreateSubscriptionReqDTO } from '../../../../domain/dto/SubscriptionDTO';
import { BillingCycle } from '../../../../domain/enums/subscription';
import { ISubscriptionRepository } from '../../../repositories/ISubscriptionRepository';
import { ISubscriptionPlanRepository } from '../../../repositories/ISubscriptionPlanRepository';
import { Subscription } from '../../../../domain/entities/Subscription';

export class HandleSubscriptionWebhookUseCase
  implements IHandleSubscriptionWebhookUseCase
{
  constructor(
    private readonly _paymentService: IPaymentService,
    private readonly _createSubscriptionUseCase: ICreateSubscriptionUseCase,
    private readonly _subscriptionRepository: ISubscriptionRepository,
    private readonly _subscriptionPlans: ISubscriptionPlanRepository
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
      case 'customer.subscription.updated': {
        console.log('customer.subscription.updated');
        await this._handleSubscriptionUpdated(data as SubscriptionUpdatedData);
        break;
      }
      case 'subscription_schedule.created': {
        console.log('subscription_schedule.created');
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
      startDate: new Date(data.createdAt * 1000),
      price: data.amountTotal / 100,
      currency: data.currency,
      stripePriceId: data.metadata.stripePriceId,
      stripeCustomerId: data.customerId,
      stripeSubscriptionId: data.subscriptionId,
      stripeSessionId: data.id,
    };
    await this._createSubscriptionUseCase.execute(dto);
  }

  private async _handleSubscriptionUpdated(
    data: SubscriptionUpdatedData
  ): Promise<void> {
    const priceId = data.items[0]?.priceId;
    if (!priceId) return;

    const existing =
      await this._subscriptionRepository.findByStripeSubscriptionId(data.id);
    if (!existing) return;

    const plan = await this._subscriptionPlans.findByStripeId(priceId);
    if (!plan) return;

    const billingCycle: BillingCycle =
      plan.getStripeId().monthly === priceId
        ? BillingCycle.MONTHLY
        : BillingCycle.YEARLY;

    const updated = new Subscription({
      id: existing.getId(),
      userId: existing.getUserId(),
      planId: plan.getId() as string,
      tier: plan.getTier(),
      badgeColor: plan.getBadgeColor(),
      billingCycle,
      status: existing.getStatus(),
      startDate: existing.getStartDate(),
      endDate: existing.getEndDate(),
      autoRenew: existing.isAutoRenew(),
      price: existing.getPrice(),
      currency: existing.getCurrency(),
      stripeSubscriptionId: existing.getStripeSubscriptionId(),
      stripeCustomerId: existing.getStripeCustomerId(),
      stripePriceId: priceId,
      createdAt: existing.getCreatedAt(),
      updatedAt: new Date(),
      cancelledAt: existing.getCancelledAt(),
      features: plan.getFeatures(),
    });

    await this._subscriptionRepository.update(updated.getId(), updated);
  }
}
