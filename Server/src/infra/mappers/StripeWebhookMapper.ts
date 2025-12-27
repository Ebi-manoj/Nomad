import Stripe from 'stripe';
import {
  CheckoutSessionData,
  SubscriptionDeletedData,
  SubscriptionUpdatedData,
  TypedWebhookEvent,
  WebhookEventType,
} from '../../domain/dto/PaymentWebhookDTO';

export class StripeWebhookMapper {
  static mapEvent(event: Stripe.Event): TypedWebhookEvent {
    const eventType = this.mapEventType(event.type);

    switch (event.type) {
      case 'checkout.session.completed':
        return {
          type: eventType,
          data: this.mapCheckoutSession(
            event.data.object as Stripe.Checkout.Session
          ),
        };

      case 'customer.subscription.updated':
        return {
          type: eventType,
          data: this.mapSubscriptionUpdated(
            event.data.object as Stripe.Subscription
          ),
        };

      case 'customer.subscription.deleted':
        return {
          type: eventType,
          data: this.mapSubscriptionDeleted(
            event.data.object as Stripe.Subscription
          ),
        };

      case 'subscription_schedule.created':
        return {
          type: eventType,
          data: event.data.object as unknown,
        };

      default:
        return {
          type: 'unknown',
          data: event.data.object,
        };
    }
  }

  private static mapEventType(stripeEventType: string): WebhookEventType {
    const typeMap: Record<string, WebhookEventType> = {
      'checkout.session.completed': 'checkout.session.completed',
      'customer.subscription.updated': 'customer.subscription.updated',
      'customer.subscription.deleted': 'customer.subscription.deleted',
      'subscription_schedule.created': 'subscription_schedule.created',
    };

    return typeMap[stripeEventType] || 'unknown';
  }

  private static mapCheckoutSession(
    session: Stripe.Checkout.Session
  ): CheckoutSessionData {
    const metadata = session.metadata || {};

    if (
      !metadata.userId ||
      !metadata.planId ||
      !metadata.tier ||
      !metadata.billingCycle
    ) {
      throw new Error('Missing required metadata in checkout session');
    }

    if (!session.subscription || !session.customer) {
      throw new Error('Missing subscription or customer in checkout session');
    }

    return {
      id: session.id,
      subscriptionId: session.subscription as string,
      customerId: session.customer as string,
      amountTotal: session.amount_total || 0,
      currency: session.currency || 'usd',
      createdAt: session.created,
      metadata: {
        userId: metadata.userId,
        planId: metadata.planId,
        tier: metadata.tier,
        billingCycle: metadata.billingCycle,
        stripePriceId: metadata.stripePriceId || '',
      },
    };
  }

  private static mapSubscriptionUpdated(
    subscription: Stripe.Subscription
  ): SubscriptionUpdatedData {
    const sub: any = subscription as any;
    return {
      id: sub.id,
      customerId: sub.customer as string,
      status: sub.status,
      currentPeriodStart: sub.billing_cycle_anchor,
      currentPeriodEnd: sub.current_period_end,
      cancelAtPeriodEnd: sub.cancel_at_period_end,
      items: sub.items.data.map((item: any) => ({
        priceId: item.price.id,
        quantity: item.quantity || 1,
      })),
    };
  }

  private static mapSubscriptionDeleted(
    subscription: Stripe.Subscription
  ): SubscriptionDeletedData {
    return {
      id: subscription.id,
      customerId: subscription.customer as string,
      status: subscription.status,
      canceledAt: subscription.canceled_at || Date.now() / 1000,
    };
  }
}
