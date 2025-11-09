export interface IPaymentService {
  createPaymentIntent(
    amount: number,
    currency: string,
    metadata: Record<string, string>
  ): Promise<{ client_secret: string; id: string }>;

  retrievePaymentIntent(
    paymentIntentId: string
  ): Promise<{ client_secret: string; id: string; status: string }>;
  //   confirmPayment(paymentIntentId: string): Promise<void>;
  //   constructWebhookEvent(
  //     payload: Record<string, string>,
  //     signature: string
  //   ): Promise<void>;
}
