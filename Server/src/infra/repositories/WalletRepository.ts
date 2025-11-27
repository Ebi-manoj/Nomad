import { MongoBaseRepository } from './BaseRepository';
import { IWalletRepository } from '../../application/repositories/IWalletRepository';
import { Wallet } from '../../domain/entities/Wallet';
import { IWalletDocument, WalletModel } from '../database/Wallet.model';
import { walletMapper } from '../mappers/walletMapper';

export class WalletRepository
  extends MongoBaseRepository<Wallet, IWalletDocument>
  implements IWalletRepository
{
  constructor() {
    super(WalletModel, walletMapper);
  }

  async findByUserId(userId: string): Promise<Wallet | null> {
    const doc = await WalletModel.findOne({ userId });
    return doc ? walletMapper.toDomain(doc) : null;
  }

  async findOrCreateByUserId(userId: string): Promise<Wallet> {
    const existing = await this.findByUserId(userId);
    if (existing) return existing;

    const wallet = new Wallet({ userId });
    return this.create(wallet);
  }
}
