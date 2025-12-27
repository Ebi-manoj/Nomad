import { Payout } from '../../domain/entities/Payout';
import { IBaseRepository } from './IBaseRepository';

export interface IPayoutRepository extends IBaseRepository<Payout> {
  findByRazorpayPayoutId(id: string): Promise<Payout | null>;
}
