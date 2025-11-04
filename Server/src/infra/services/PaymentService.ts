import { IPaymentService } from '../../application/services/IPaymentService';
import Stripe from 'stripe';
import { env } from '../utils/env';

export class StripePaymentService implements IPaymentService {
  private readonly stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-10-29.clover',
    });
  }

  async createPaymentIntent(
    amount: number,
    currency: string = 'inr',
    metadata: Record<string, string>
  ): Promise<{ client_secret: string; id: string }> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency,
        metadata,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        client_secret: paymentIntent.client_secret!,
        id: paymentIntent.id,
      };
    } catch (error) {
      console.log(error);

      throw new Error(`Stripe API error`);
    }
  }
}
