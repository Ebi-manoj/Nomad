import { Types } from 'mongoose';
import { Payout } from '../../domain/entities/Payout';
import type { IPayoutDocument } from '../database/Payout.model';
import { IMapper } from './IMapper';

export const payoutMapper: IMapper<Payout, IPayoutDocument> = {
  toDomain(doc: IPayoutDocument): Payout {
    return new Payout({
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      transactionId: doc.transactionId,
      razorpayPayoutId: doc.razorpayPayoutId,
      contactId: doc.contactId,
      fundAccountId: doc.fundAccountId,
      amount: doc.amount,
      mode: doc.mode,
      status: doc.status,
      utr: doc.utr,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  },

  toPersistence(domain: Payout): Partial<IPayoutDocument> {
    return {
      userId: new Types.ObjectId(domain.getUserId()),
      transactionId: domain.getTransactionId(),
      razorpayPayoutId: domain.getRazorpayPayoutId(),
      contactId: domain.getContactId(),
      fundAccountId: domain.getFundAccountId(),
      amount: domain.getAmount(),
      mode: domain.getMode(),
      status: domain.getStatus(),
      utr: domain.getUtr(),
    } as Partial<IPayoutDocument>;
  },
};
