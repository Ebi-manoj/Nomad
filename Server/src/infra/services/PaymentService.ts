import { IPaymentService } from '../../application/services/IPaymentService';
import Stripe from 'stripe';
import { env } from '../utils/env';
import { CustomError } from '../../domain/errors/CustomError';
import { HttpStatus } from '../../domain/enums/HttpStatusCode';

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
  async retrievePaymentIntent(
    paymentIntentId: string
  ): Promise<{ client_secret: string; id: string; status: string }> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(
        paymentIntentId
      );

      if (!paymentIntent || paymentIntent.status === 'canceled') {
        throw new CustomError(
          HttpStatus.BAD_REQUEST,
          'Invalid or canceled PaymentIntent'
        );
      }

      return {
        client_secret: paymentIntent.client_secret!,
        id: paymentIntent.id,
        status: paymentIntent.status,
      };
    } catch (error) {
      console.error('Stripe retrievePaymentIntent error:', error);
      throw new Error(`Stripe API error while retrieving payment intent`);
    }
  }

  async createSubscriptionCheckoutSession(params: {
    priceId: string;
    customerEmail?: string;
    customerId?: string;
    metadata?: Record<string, string>;
    trialPeriodDays?: number;
  }): Promise<{ id: string; url: string }> {
    try {
      const session = await this.stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [
          {
            price: params.priceId,
            quantity: 1,
          },
        ],
        success_url:
          `${env.CLIENT_URL}/subscription/success` +
          '?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: `${env.CLIENT_URL}/subscription`,
        customer_email: params.customerId ? undefined : params.customerEmail,
        customer: params.customerId,
        metadata: params.metadata,
        subscription_data: params.trialPeriodDays
          ? { trial_period_days: params.trialPeriodDays }
          : undefined,
      });

      if (!session.url || !session.id) {
        throw new Error('Failed to create Stripe Checkout Session');
      }

      return { id: session.id, url: session.url };
    } catch (error) {
      console.error('Stripe createSubscriptionCheckoutSession error:', error);
      throw new Error('Stripe API error while creating checkout session');
    }
  }
}
