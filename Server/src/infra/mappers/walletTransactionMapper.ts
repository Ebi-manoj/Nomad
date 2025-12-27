import { Types } from 'mongoose';
import { WalletTransaction } from '../../domain/entities/WalletTransaction';
import { WalletTransactionStatus, WalletTransactionType } from '../../domain/enums/Wallet';
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
      referenceType: doc.referenceType,
      referenceId: doc.referenceId,
      amount: doc.amount,
      type: doc.type as WalletTransactionType,
      description: doc.description,
      status: doc.status as WalletTransactionStatus,
      metadata: doc.metadata as Record<string, unknown> | undefined,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  },

  toPersistence(
    domain: WalletTransaction
  ): Partial<IWalletTransactionDocument> {
    return {
      userId: new Types.ObjectId(domain.getUserId()),
      referenceType: domain.getReferenceType(),
      referenceId: domain.getReferenceId(),
      amount: domain.getAmount(),
      type: domain.getType(),
      description: domain.getDescription(),
      status: domain.getStatus(),
      metadata: domain.getMetadata(),
    };
  },
};
