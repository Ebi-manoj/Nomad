// src/core/domain/payment/events/PaymentWebhookEvent.ts

export type WebhookEventType =
  | 'checkout.session.completed'
  | 'customer.subscription.updated'
  | 'customer.subscription.deleted'
  | 'subscription_schedule.created'
  | 'unknown';

export interface BaseWebhookEvent {
  type: WebhookEventType;
  data: unknown;
}

export interface CheckoutSessionData {
  id: string;
  subscriptionId: string;
  customerId: string;
  amountTotal: number;
  currency: string;
  createdAt: number;
  metadata: {
    userId: string;
    planId: string;
    tier: string;
    billingCycle: string;
    stripePriceId: string;
  };
}

export interface SubscriptionUpdatedData {
  id: string;
  customerId: string;
  status: string;
  currentPeriodStart: number;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
  items: Array<{
    priceId: string;
    quantity: number;
  }>;
}

export interface SubscriptionDeletedData {
  id: string;
  customerId: string;
  status: string;
  canceledAt: number;
}

export type WebhookEventData =
  | CheckoutSessionData
  | SubscriptionUpdatedData
  | SubscriptionDeletedData
  | unknown;

export interface TypedWebhookEvent {
  type: WebhookEventType;
  data: WebhookEventData;
}
