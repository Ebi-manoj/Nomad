import { IPaymentRepository } from '../../application/repositories/IPaymentRepository';
import { Payment } from '../../domain/entities/Payment';
import { IPaymentDocument, PaymentModel } from '../database/payment.model';
import { PaymentMapper } from '../mappers/paymentMapper';
import { MongoBaseRepository } from './BaseRepository';

export class PaymentRepository
  extends MongoBaseRepository<Payment, IPaymentDocument>
  implements IPaymentRepository
{
  constructor() {
    super(PaymentModel, PaymentMapper);
  }
}
