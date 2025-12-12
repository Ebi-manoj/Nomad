import { IPaymentService } from '../../../services/IPaymentService';
import { IHandleSubscriptionWebhookUseCase } from './IHandleSubscriptionWebhookUseCase';
import { ISubscriptionRepository } from '../../../repositories/ISubscriptionRepository';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { Subscription } from '../../../../domain/entities/Subscription';
import {
  BillingCycle,
  SubscriptionStatus,
  SubscriptionTier,
} from '../../../../domain/enums/subscription';
import { findPlanByPriceId } from '../../../../infra/providers/StripePriceConfig';
import { ICheckoutSessionRepository } from '../../../repositories/ICheckoutSessionRepository';

export class HandleSubscriptionWebhookUseCase
  implements IHandleSubscriptionWebhookUseCase
{
  constructor(
    private readonly _paymentService: IPaymentService,
    private readonly _subscriptions: ISubscriptionRepository,
    private readonly _users: IUserRepository,
    private readonly _checkoutSessions: ICheckoutSessionRepository
  ) {}

  async execute(payload: Buffer | string, signature?: string): Promise<void> {
    const { eventType, data } = await this.getEventAndData(payload, signature);

    // Handle events
    switch (eventType) {
      case 'checkout.session.completed': {
        console.log('StripeWebhook checkout.session.completed');
        await this.handleCreateSubscription(data);
        break;
      }
      case 'customer.subscription.updated': {
        console.log('StripeWebhook customer.subscription.updated');
        await this.handleUpdateSubscription(data);
        break;
      }
      case 'customer.subscription.deleted': {
        console.log('StripeWebhook customer.subscription.deleted');
        await this.handleDeleteSubscription(data);
        break;
      }

      default: {
        break;
      }
    }
  }

  private async getEventAndData(
    payload: Buffer | string,
    signature?: string
  ): Promise<{ data: Record<string, unknown>; eventType: string }> {
    let eventType: string | undefined;
    let data;

    // Try Stripe verification first
    if (signature) {
      try {
        const evt = await this._paymentService.constructWebhookEvent(
          payload,
          signature
        );
        data = evt.data;
        eventType = evt.type;
      } catch (err) {
        console.log('verification failed,parsing manually');
      }
    }

    if (!eventType) {
      // Fallback: try to parse JSON and read type
      try {
        const text = Buffer.isBuffer(payload)
          ? payload.toString('utf8')
          : typeof payload === 'string'
          ? payload
          : JSON.stringify(payload);
        const parsed = JSON.parse(text);
        eventType = parsed?.type || 'unknown';
        data = parsed?.data;
      } catch {
        eventType = 'unknown';
      }
    }
    return { eventType: eventType as string, data };
  }

  private async handleCreateSubscription(data: Record<string, unknown>) {
    const session = (data as any)?.object;
    if (!session) return;
    const stripeSubscriptionId: string | undefined = session.subscription;
    const stripeCustomerId: string | undefined = session.customer;
    const metadata: Record<string, string> | undefined = session.metadata;
    await this._checkoutSessions.updateStatus(session.id, 'completed');

    if (!stripeSubscriptionId) return;

    // Determine user
    let userId: string | undefined = metadata?.userId;
    if (!userId && stripeCustomerId) {
      const customer = await this._paymentService.retrieveCustomer(
        stripeCustomerId
      );
      if (customer?.email) {
        const user = await this._users.findByEmail(customer.email);
        userId = user?.getId();
      }
    }
    if (!userId) return;

    // Get subscription details from Stripe
    const sub = await this._paymentService.retrieveSubscription(
      stripeSubscriptionId
    );
    const firstItem = sub.items[0];
    const priceId = firstItem?.price?.id;
    let plan = priceId ? findPlanByPriceId(priceId) : null;
    if (!plan && metadata?.tier && metadata?.billingCycle) {
      plan = {
        tier: metadata.tier as SubscriptionTier,
        billingCycle: metadata.billingCycle as BillingCycle,
      };
    }
    if (!plan) return;

    const startDate = new Date((sub.current_period_start || 0) * 1000);
    const price = (firstItem?.price?.unit_amount ?? 0) / 100;
    const currency = firstItem?.price?.currency?.toUpperCase?.() || 'INR';

    // Idempotency
    const existing = await this._subscriptions.findByStripeSubscriptionId(
      sub.id
    );
    if (existing) return;

    const subscription = new Subscription({
      userId,
      tier: plan.tier,
      billingCycle: plan.billingCycle,
      status: SubscriptionStatus.ACTIVE,
      startDate,
      autoRenew: true,
      price,
      currency,
      stripeSubscriptionId: sub.id,
      stripeCustomerId: sub.customer || undefined,
      stripePriceId: priceId,
    });
    await this._subscriptions.create(subscription);
  }
  private async handleUpdateSubscription(data: Record<string, unknown>) {
    const obj = (data as any)?.object;
    const stripeSubscriptionId: string | undefined = obj?.id;
    if (!stripeSubscriptionId) return;
    const sub = await this._paymentService.retrieveSubscription(
      stripeSubscriptionId
    );
    const existing = await this._subscriptions.findByStripeSubscriptionId(
      stripeSubscriptionId
    );
    if (!existing) return;
    const firstItem = sub.items[0];
    const priceId = firstItem?.price?.id;
    const plan = priceId ? findPlanByPriceId(priceId) : null;
    const startDate = new Date((sub.current_period_start || 0) * 1000);
    const price = (firstItem?.price?.unit_amount ?? 0) / 100;
    const currency =
      firstItem?.price?.currency?.toUpperCase?.() || existing.getCurrency();
    const status =
      sub.status === 'active'
        ? SubscriptionStatus.ACTIVE
        : sub.status === 'canceled'
        ? SubscriptionStatus.CANCELLED
        : SubscriptionStatus.PENDING;
    const updated = new Subscription({
      id: existing.getId(),
      userId: existing.getUserId(),
      tier: plan?.tier || existing.getTier(),
      billingCycle: plan?.billingCycle || existing.getBillingCycle(),
      status,
      startDate,
      autoRenew: true,
      price,
      currency,
      stripeSubscriptionId: stripeSubscriptionId,
      stripeCustomerId: sub.customer || undefined,
      stripePriceId: priceId || existing.getStripePriceId(),
      createdAt: existing.getCreatedAt(),
      updatedAt: new Date(),
      cancelledAt:
        status === SubscriptionStatus.CANCELLED ? new Date() : undefined,
    });
    await this._subscriptions.update(existing.getId(), updated);
  }

  private async handleDeleteSubscription(data: Record<string, unknown>) {
    const obj = (data as any)?.object;
    const stripeSubscriptionId: string | undefined = obj?.id;
    if (!stripeSubscriptionId) return;
    const existing = await this._subscriptions.findByStripeSubscriptionId(
      stripeSubscriptionId
    );
    if (!existing) return;
    const updated = new Subscription({
      id: existing.getId(),
      userId: existing.getUserId(),
      tier: existing.getTier(),
      billingCycle: existing.getBillingCycle(),
      status: SubscriptionStatus.CANCELLED,
      startDate: existing.getStartDate(),
      endDate: existing.getEndDate(),
      autoRenew: false,
      price: existing.getPrice(),
      currency: existing.getCurrency(),
      stripeSubscriptionId: existing.getStripeSubscriptionId(),
      stripeCustomerId: existing.getStripeCustomerId(),
      stripePriceId: existing.getStripePriceId(),
      createdAt: existing.getCreatedAt(),
      updatedAt: new Date(),
      cancelledAt: new Date(),
    });
    await this._subscriptions.update(existing.getId(), updated);
  }
}
