import { MongoBaseRepository } from './BaseRepository';
import { IPayoutRepository } from '../../application/repositories/IPayoutRepository';
import { Payout } from '../../domain/entities/Payout';
import { IPayoutDocument, PayoutModel } from '../database/Payout.model';
import { payoutMapper } from '../mappers/payoutMapper';

export class PayoutRepository
  extends MongoBaseRepository<Payout, IPayoutDocument>
  implements IPayoutRepository
{
  constructor() {
    super(PayoutModel, payoutMapper);
  }

  async findByRazorpayPayoutId(id: string): Promise<Payout | null> {
    const doc = await this.model.findOne({ razorpayPayoutId: id });
    return doc ? this.mapper.toDomain(doc) : null;
  }
}
