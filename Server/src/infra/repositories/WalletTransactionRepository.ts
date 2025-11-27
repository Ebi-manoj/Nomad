import { MongoBaseRepository } from './BaseRepository';
import { IWalletTransactionRepository } from '../../application/repositories/IWalletTransactionRepository';
import { WalletTransaction } from '../../domain/entities/WalletTransaction';
import {
  IWalletTransactionDocument,
  WalletTransactionModel,
} from '../database/WalletTransaction.model';
import { walletTransactionMapper } from '../mappers/walletTransactionMapper';

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
}
