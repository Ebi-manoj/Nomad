import { IPaymentRepository } from '../../application/repositories/IPaymentRepository';
import { JoinRequest } from '../../domain/entities/JoinRequests';
import { Payment } from '../../domain/entities/Payment';
import { PaymentStatus } from '../../domain/enums/payment';
import { JoinRequestStatus } from '../../domain/enums/Ride';
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
    return await this.model.findOne({ stripePaymentId: paymentIntentId });
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
