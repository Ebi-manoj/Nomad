import { Types } from 'mongoose';
import { WalletTransaction } from '../../domain/entities/WalletTransaction';
import { WalletTransactionType } from '../../domain/enums/Wallet';
import { IWalletTransactionDocument } from '../database/WalletTransaction.model';
import { IMapper } from './IMapper';

export const walletTransactionMapper: IMapper<
  WalletTransaction,
  IWalletTransactionDocument
> = {
  toDomain(doc: IWalletTransactionDocument): WalletTransaction {
    return new WalletTransaction({
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      rideId: doc.rideId?.toString(),
      amount: doc.amount,
      type: doc.type as WalletTransactionType,
      description: doc.description,
      metadata: doc.metadata as Record<string, unknown> | undefined,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  },

  toPersistence(domain: WalletTransaction): Partial<IWalletTransactionDocument> {
    return {
      userId: new Types.ObjectId(domain.getUserId()),
      rideId: domain.getRideId()
        ? new Types.ObjectId(domain.getRideId()!)
        : undefined,
      amount: domain.getAmount(),
      type: domain.getType(),
      description: domain.getDescription(),
      metadata: domain.getMetadata(),
    };
  },
};
