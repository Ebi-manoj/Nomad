import { IPaymentService } from '../../../services/IPaymentService';
import { IHandleSubscriptionWebhookUseCase } from './IHandleSubscriptionWebhookUseCase';

export class HandleSubscriptionWebhookUseCase
  implements IHandleSubscriptionWebhookUseCase
{
  constructor(private readonly paymentService: IPaymentService) {}

  async execute(payload: Buffer | string, signature?: string): Promise<void> {
    let eventType: string | undefined;
    let data;

    // Try Stripe verification first
    if (signature) {
      try {
        const evt = await this.paymentService.constructWebhookEvent(
          payload,
          signature
        );
        data = evt.data;
        eventType = evt.type;
      } catch (err) {
        console.warn(
          '[StripeWebhook] Signature verification failed. Falling back to naive parse.'
        );
      }
    }

    if (!eventType) {
      // Fallback: try to parse JSON and read type
      try {
        const text = Buffer.isBuffer(payload)
          ? payload.toString('utf8')
          : typeof payload === 'string'
          ? payload
          : JSON.stringify(payload);
        const parsed = JSON.parse(text);
        eventType = parsed?.type || 'unknown';
        data = parsed?.data;
      } catch {
        eventType = 'unknown';
      }
    }

    console.log(data);

    // Just log which event occurred (extend as needed later)
    switch (eventType) {
      case 'checkout.session.completed':
        console.log('[StripeWebhook] checkout.session.completed');
        break;
      case 'customer.subscription.created':
        console.log('[StripeWebhook] customer.subscription.created');
        break;

      default:
        console.log('[StripeWebhook] event:', eventType);
        break;
    }
  }
}
