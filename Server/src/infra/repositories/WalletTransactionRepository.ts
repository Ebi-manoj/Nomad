import { MongoBaseRepository } from './BaseRepository';
import { IWalletTransactionRepository } from '../../application/repositories/IWalletTransactionRepository';
import { WalletTransaction } from '../../domain/entities/WalletTransaction';
import {
  IWalletTransactionDocument,
  WalletTransactionModel,
} from '../database/WalletTransaction.model';
import { walletTransactionMapper } from '../mappers/walletTransactionMapper';
import { WalletTransactionStatus, WalletTransactionType } from '../../domain/enums/Wallet';
import { Types } from 'mongoose';

export class WalletTransactionRepository
  extends MongoBaseRepository<WalletTransaction, IWalletTransactionDocument>
  implements IWalletTransactionRepository
{
  constructor() {
    super(WalletTransactionModel, walletTransactionMapper);
  }

  async findByUserId(
    userId: string,
    skip: number,
    limit: number
  ): Promise<WalletTransaction[]> {
    const docs = await this.model
      .find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    return docs.map(d => this.mapper.toDomain(d));
  }

  async countByUserId(userId: string): Promise<number> {
    return this.model.countDocuments({ userId });
  }
  async findTotalCredits(userId: string): Promise<number> {
    const result = await this.model.aggregate([
      {
        $match: {
          type: WalletTransactionType.CREDIT,
          status: WalletTransactionStatus.SUCCESS,
          userId: new Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: null,
          totalCredits: { $sum: '$amount' },
        },
      },
    ]);

    return result.length ? result[0].totalCredits : 0;
  }
  async findTotalDebits(userId: string): Promise<number> {
    const result = await this.model.aggregate([
      {
        $match: {
          type: WalletTransactionType.DEBIT,
          status: WalletTransactionStatus.SUCCESS,
          userId: new Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: null,
          totalDebits: { $sum: '$amount' },
        },
      },
    ]);
    return result.length ? result[0].totalDebits : 0;
  }
}
