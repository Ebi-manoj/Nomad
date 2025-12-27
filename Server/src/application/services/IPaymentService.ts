import {
  CreateStripePriceDTO,
  CreateStripeProductDTO,
  StripePriceResponse,
  StripeProductResponse,
} from '../../domain/dto/adminSubscription';
import { TypedWebhookEvent } from '../../domain/dto/PaymentWebhookDTO';

export interface IPaymentService {
  createPaymentIntent(
    amount: number,
    currency: string,
    metadata: Record<string, string>
  ): Promise<{ client_secret: string; id: string }>;

  retrievePaymentIntent(
    paymentIntentId: string
  ): Promise<{ client_secret: string; id: string; status: string }>;
  createSubscriptionCheckoutSession(params: {
    priceId: string;
    customerEmail?: string;
    customerId?: string;
    metadata?: Record<string, string | number | null>;
    trialPeriodDays?: number;
  }): Promise<{ id: string; url: string }>;

  constructWebhookEvent(
    payload: Buffer | string,
    signature: string
  ): Promise<TypedWebhookEvent>;

  retrieveSubscription(subscriptionId: string): Promise<{
    id: string;
    status: string;
    current_period_start: number;
    customer: string | null;
    items: Array<{
      price: { id: string; unit_amount: number | null; currency: string };
    }>;
  }>;

  retrieveCustomer(customerId: string): Promise<{
    id: string;
    email: string | null | undefined;
  }>;
  createProduct(data: CreateStripeProductDTO): Promise<StripeProductResponse>;
  createPrice(data: CreateStripePriceDTO): Promise<StripePriceResponse>;

  getSubscription(
    stripeSubscriptionId: string
  ): Promise<{
    id: string;
    items: Array<{ id: string; priceId: string; quantity: number }>;
  }>;

  updateSubscription(
    stripeSubscriptionId: string,
    params: {
      items: Array<{ id: string; price: string }>;
      proration_behavior: 'always_invoice' | 'create_prorations' | 'none';
      billing_cycle_anchor?: 'unchanged' | 'now' | number;
    }
  ): Promise<void>;

  createSubscriptionSchedule(params: {
    from_subscription: string;
  }): Promise<{
    id: string;
    phases: Array<{ items: Array<{ price: string; quantity: number }> }>;
  }>;

  updateSubscriptionSchedule(
    scheduleId: string,
    params: {
      phases: Array<{
        items: Array<{ price: string; quantity: number }>;
        proration_behavior?: 'none' | 'create_prorations' | 'always_invoice';
        iterations?: number;
      }>;
    }
  ): Promise<void>;
}
