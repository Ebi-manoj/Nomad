import { Payment } from '../../domain/entities/Payment';
import { IBaseRepository } from './IBaseRepository';
export interface IPaymentRepository extends IBaseRepository<Payment> {
  findPendingPaymentsByHikeId(hikeId: string): Promise<Payment[]>;
  findByStripeId(paymentIntentId: string): Promise<Payment | null>;
  findExpiredPayments(): Promise<Payment[]>;
}
