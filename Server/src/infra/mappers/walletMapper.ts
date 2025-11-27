import { Types } from 'mongoose';
import { Wallet } from '../../domain/entities/Wallet';
import { IWalletDocument } from '../database/Wallet.model';
import { IMapper } from './IMapper';

export const walletMapper: IMapper<Wallet, IWalletDocument> = {
  toDomain(persistence: IWalletDocument): Wallet {
    return new Wallet({
      id: persistence._id.toString(),
      userId: persistence.userId.toString(),
      balance: persistence.balance,
      currency: persistence.currency,
      createdAt: persistence.createdAt,
      updatedAt: persistence.updatedAt,
    });
  },

  toPersistence(domain: Wallet): Partial<IWalletDocument> {
    return {
      userId: new Types.ObjectId(domain.getUserId()),
      balance: domain.getBalance(),
      currency: domain.getCurrency(),
    };
  },
};
