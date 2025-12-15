import {
  CreateStripePriceDTO,
  CreateStripeProductDTO,
  StripePriceResponse,
  StripeProductResponse,
} from '../../domain/dto/adminSubscription';

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
    metadata?: Record<string, unknown>;
    trialPeriodDays?: number;
  }): Promise<{ id: string; url: string }>;

  constructWebhookEvent(
    payload: Buffer | string,
    signature: string
  ): Promise<{ type: string; data: unknown }>;

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
}
