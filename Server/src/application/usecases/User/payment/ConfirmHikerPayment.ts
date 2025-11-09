import {
  PaymentInfoNotFound,
  PaymentNotSuccessfull,
} from '../../../../domain/errors/PaymentError';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { IJoinRequestRepository } from '../../../repositories/IJoinRequestsRepository';
import { IPaymentRepository } from '../../../repositories/IPaymentRepository';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { IPaymentService } from '../../../services/IPaymentService';
import { IConfirmHikerPayment } from './IConfirmHikerPayment';

export class ConfirmHikerPayment implements IConfirmHikerPayment {
  constructor(
    private readonly paymentService: IPaymentService,
    private readonly paymentRepository: IPaymentRepository,
    private readonly rideRepository: IRideRepository,
    private readonly joinRequestRepository: IJoinRequestRepository,
    private readonly hikeRepository: IHikeRepository
  ) {}

  async execute(paymentIntentId: string): Promise<void> {
    const payment = await this.paymentRepository.findByStripeId(
      paymentIntentId
    );
    if (!payment) throw new PaymentInfoNotFound();

    const paymentIntent = await this.paymentService.retrievePaymentIntent(
      paymentIntentId
    );
    if (paymentIntent.status !== 'succeeded') throw new PaymentNotSuccessfull();
  }
}
