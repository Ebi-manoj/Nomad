import { IPaymentService } from '../../application/services/IPaymentService';
import Stripe from 'stripe';
import { env } from '../utils/env';
import { CustomError } from '../../domain/errors/CustomError';
import { HttpStatus } from '../../domain/enums/HttpStatusCode';

export class StripePaymentService implements IPaymentService {
  private readonly _stripe: Stripe;
  constructor() {
    this._stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-10-29.clover',
    });
  }

  async createPaymentIntent(
    amount: number,
    currency: string = 'inr',
    metadata: Record<string, string>
  ): Promise<{ client_secret: string; id: string }> {
    try {
      const paymentIntent = await this._stripe.paymentIntents.create({
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
      const paymentIntent = await this._stripe.paymentIntents.retrieve(
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
      const session = await this._stripe.checkout.sessions.create({
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
        cancel_url: `${env.CLIENT_URL}/subscriptions`,
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

  async constructWebhookEvent(
    payload: Buffer | string,
    signature: string
  ): Promise<{ type: string; data: any }> {
    try {
      const secret = env.STRIPE_WEBHOOKSECERTKEY;
      const event = this._stripe.webhooks.constructEvent(
        payload,
        signature,
        secret
      );
      return { type: event.type, data: event.data };
    } catch (error) {
      console.error('Stripe constructWebhookEvent error:', error);
      throw new Error('Invalid Stripe webhook signature');
    }
  }

  async retrieveSubscription(subscriptionId: string): Promise<{
    id: string;
    status: string;
    current_period_start: number;
    customer: string | null;
    items: Array<{
      price: {
        id: string;
        unit_amount: number | null;
        currency: string;
        recurring?: { interval?: string };
      };
    }>;
  }> {
    const sub = (await this._stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['items.data.price'],
    })) as any;

    return {
      id: sub.id,
      status: sub.status,
      current_period_start: sub.billing_cycle_anchor,
      customer:
        typeof sub.customer === 'string'
          ? sub.customer
          : sub.customer?.id || null,
      items: sub.items.data.map((it: any) => ({
        price: {
          id: it.price.id,
          unit_amount: it.price.unit_amount ?? null,
          currency: it.price.currency,
          recurring: {
            interval:
              (it.price.recurring && it.price.recurring.interval) || undefined,
          },
        },
      })),
    };
  }

  async retrieveCustomer(customerId: string): Promise<{
    id: string;
    email: string | null | undefined;
  }> {
    const customer = (await this._stripe.customers.retrieve(customerId)) as any;
    return { id: customer.id, email: customer.email };
  }
}
