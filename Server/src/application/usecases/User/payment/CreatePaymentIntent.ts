import {
  paymentIntentRequestDTO,
  paymentIntentResponseDTO,
} from '../../../../domain/dto/paymentService';
import { InvalidAmount } from '../../../../domain/errors/PaymentError';
import { IPaymentRepository } from '../../../repositories/IPaymentRepository';
import { IPaymentService } from '../../../services/IPaymentService';
import { ICreatePaymentIntentUseCase } from './ICreatePaymentIntent';

export class CreatePaymentIntentUseCase implements ICreatePaymentIntentUseCase {
  constructor(
    private readonly paymentSerice: IPaymentService,
    private readonly paymentRepository: IPaymentRepository
  ) {}

  async execute(
    data: paymentIntentRequestDTO
  ): Promise<paymentIntentResponseDTO> {
    try {
      if (!data.amount || data.amount <= 0) {
        throw new InvalidAmount();
      }

      // Create payment intent with Stripe
      const paymentIntent = await this.paymentSerice.createPaymentIntent(
        data.amount,
        data.currency,
        data.metadata
      );

      return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
