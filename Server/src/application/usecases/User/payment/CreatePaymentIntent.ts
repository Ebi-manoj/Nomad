import {
  paymentIntentRequestDTO,
  paymentIntentResponseDTO,
} from '../../../../domain/dto/paymentService';
import { PaymentStatus } from '../../../../domain/enums/payment';
import {
  InvalidAmount,
  InvalidPaymentStatus,
  PaymentExpired,
  PaymentInfoNotFound,
} from '../../../../domain/errors/PaymentError';
import { ILogger } from '../../../providers/ILogger';
import { IPaymentRepository } from '../../../repositories/IPaymentRepository';
import { IPaymentService } from '../../../services/IPaymentService';
import { ICreatePaymentIntentUseCase } from './ICreatePaymentIntent';

export class CreatePaymentIntentUseCase implements ICreatePaymentIntentUseCase {
  constructor(
    private readonly _paymentService: IPaymentService,
    private readonly _paymentRepository: IPaymentRepository,
    private readonly _logger: ILogger
  ) {}

  async execute(
    data: paymentIntentRequestDTO
  ): Promise<paymentIntentResponseDTO> {
    this._logger.info('CreatePaymentIntent executing with', { ...data });
    try {
      if (!data.amount || data.amount <= 0) {
        throw new InvalidAmount();
      }
      const payment = await this._paymentRepository.findById(data.paymentId);
      if (!payment) throw new PaymentInfoNotFound();

      if (payment.getStatus() !== PaymentStatus.PENDING)
        throw new InvalidPaymentStatus();

      if (payment.getExpiresAt().getTime() < Date.now())
        throw new PaymentExpired();
      const paymentIntentId = payment.getStripPaymentId();
      if (paymentIntentId) {
        const paymentIntent = await this._paymentService.retrievePaymentIntent(
          paymentIntentId
        );
        return {
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
        };
      }

      // Create payment intent with Stripe
      const paymentIntent = await this._paymentService.createPaymentIntent(
        payment.getAmount(),
        data.currency,
        data.metadata
      );

      payment.setStripePaymentId(paymentIntent.id);
      await this._paymentRepository.update(payment.getId(), payment);

      return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      };
    } catch (error) {
      this._logger.error('CreatePaymentIntent Failed', { error });
      throw error;
    }
  }
}
