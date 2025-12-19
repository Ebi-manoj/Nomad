import { IPaymentService } from '../../application/services/IPaymentService';
import Stripe from 'stripe';
import { env } from '../utils/env';
import { CustomError } from '../../domain/errors/CustomError';
import { HttpStatus } from '../../domain/enums/HttpStatusCode';
import {
  CreateStripePriceDTO,
  CreateStripeProductDTO,
  StripePriceResponse,
  StripeProductResponse,
} from '../../domain/dto/adminSubscription';
import { TypedWebhookEvent } from '../../domain/dto/PaymentWebhookDTO';
import { StripeWebhookMapper } from '../mappers/StripeWebhookMapper';

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
    metadata?: Record<string, string | number | null>;
    trialPeriodDays?: number;
  }): Promise<{ id: string; url: string }> {
    try {
      const sessionParams: Stripe.Checkout.SessionCreateParams = {
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
        metadata: params.metadata as Stripe.MetadataParam,
        subscription_data: params.trialPeriodDays
          ? { trial_period_days: params.trialPeriodDays }
          : undefined,
      };

      const session = await this._stripe.checkout.sessions.create(sessionParams);

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
  ): Promise<TypedWebhookEvent> {
    try {
      const secret = env.STRIPE_WEBHOOKSECERTKEY;
      const event = this._stripe.webhooks.constructEvent(
        payload,
        signature,
        secret
      );
      return StripeWebhookMapper.mapEvent(event);
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

  async createProduct(
    data: CreateStripeProductDTO
  ): Promise<StripeProductResponse> {
    try {
      const product = await this._stripe.products.create({
        name: data.name,
        description: data.description,
        images: data.images || [],
        metadata: data.metadata || {},
        active: true,
      });

      return {
        id: product.id,
        name: product.name,
        description: product.description || undefined,
        images: product.images || [],
        metadata: product.metadata || {},
      };
    } catch (error) {
      console.error('Stripe createProduct error:', error);
      throw new Error('Failed to create Stripe product');
    }
  }

  async createPrice(data: CreateStripePriceDTO): Promise<StripePriceResponse> {
    try {
      const price = await this._stripe.prices.create({
        product: data.productId,
        unit_amount: data.unitAmount,
        currency: 'inr',
        recurring: {
          interval: data.recurring.interval,
          interval_count: data.recurring.intervalCount || 1,
        },
        metadata: data.metadata || {},
      });

      return {
        id: price.id,
        productId:
          typeof price.product === 'string' ? price.product : price.product.id,
        unitAmount: price.unit_amount || 0,
        currency: price.currency,
        recurring: {
          interval: price.recurring?.interval || 'month',
          intervalCount: price.recurring?.interval_count || 1,
        },
      };
    } catch (error) {
      console.error('Stripe createPrice error:', error);
      throw new Error('Failed to create Stripe price');
    }
  }

  async getSubscription(
    stripeSubscriptionId: string
  ): Promise<{
    id: string;
    items: Array<{ id: string; priceId: string; quantity: number }>;
  }> {
    const sub = await this._stripe.subscriptions.retrieve(
      stripeSubscriptionId,
      { expand: ['items.data.price'] }
    );
    const subscription = sub as Stripe.Subscription;
    const items = (subscription.items?.data || []).map(it => ({
      id: it.id,
      priceId: (it.price as Stripe.Price).id,
      quantity: it.quantity ?? 1,
    }));
    return { id: subscription.id, items };
  }

  async updateSubscription(
    stripeSubscriptionId: string,
    params: {
      items: Array<{ id: string; price: string }>;
      proration_behavior: 'always_invoice' | 'create_prorations' | 'none';
      billing_cycle_anchor?: 'unchanged' | 'now' | number;
    }
  ): Promise<void> {
    await this._stripe.subscriptions.update(stripeSubscriptionId, {
      items: params.items,
      proration_behavior: params.proration_behavior as any,
      billing_cycle_anchor: params.billing_cycle_anchor as any,
    });
  }

  async createSubscriptionSchedule(params: {
    from_subscription: string;
  }): Promise<{
    id: string;
    phases: Array<{ items: Array<{ price: string; quantity: number }> }>;
  }> {
    const schedule = await this._stripe.subscriptionSchedules.create({
      from_subscription: params.from_subscription,
    });
    return {
      id: schedule.id,
      phases: (schedule.phases || []).map(ph => ({
        items: (ph.items || []).map(i => ({ price: i.price as string, quantity: i.quantity || 1 })),
      })),
    };
  }

  async updateSubscriptionSchedule(
    scheduleId: string,
    params: {
      phases: Array<{
        items: Array<{ price: string; quantity: number }>;
        proration_behavior?: 'none' | 'create_prorations' | 'always_invoice';
        iterations?: number;
      }>;
    }
  ): Promise<void> {
    await this._stripe.subscriptionSchedules.update(scheduleId, {
      phases: params.phases,
    });
  }
}
