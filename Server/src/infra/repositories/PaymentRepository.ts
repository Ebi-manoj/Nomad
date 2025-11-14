import { IPaymentRepository } from '../../application/repositories/IPaymentRepository';
import { Payment } from '../../domain/entities/Payment';
import { PaymentStatus } from '../../domain/enums/payment';
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
  async findPendingPaymentsByHikeId(hikeId: string): Promise<Payment[]> {
    const payments = await this.model.find({
      hikeId,
      status: PaymentStatus.PENDING,
    });
    return payments.map(p => this.mapper.toDomain(p));
  }

  async findByStripeId(paymentIntentId: string): Promise<Payment | null> {
    const found = await this.model.findOne({
      stripePaymentId: paymentIntentId,
    });
    if (!found) return null;
    return this.mapper.toDomain(found);
  }

  async findExpiredPayments(): Promise<Payment[]> {
    const now = new Date();
    const docs = await this.model.find({
      status: PaymentStatus.PENDING,
      expiresAt: { $lt: now },
    });
    return docs.map(d => this.mapper.toDomain(d));
  }
}
