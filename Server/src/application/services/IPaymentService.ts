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
    successUrl: string;
    cancelUrl: string;
    customerEmail?: string;
    customerId?: string;
    metadata?: Record<string, string>;
    trialPeriodDays?: number;
  }): Promise<{ id: string; url: string }>;
  //   confirmPayment(paymentIntentId: string): Promise<void>;
  //   constructWebhookEvent(
  //     payload: Record<string, string>,
  //     signature: string
  //   ): Promise<void>;
}
