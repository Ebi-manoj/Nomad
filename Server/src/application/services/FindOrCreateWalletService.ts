import { Wallet } from '../../domain/entities/Wallet';
import { IWalletRepository } from '../repositories/IWalletRepository';
import { IFindOrCreateWalletService } from './IFindOrCreateWalletService';

export class FindOrCreateWalletService implements IFindOrCreateWalletService {
  constructor(private readonly _walletRepository: IWalletRepository) {}

  async execute(userId: string): Promise<Wallet> {
    let wallet = await this._walletRepository.findByUserId(userId);
    if (!wallet) {
      wallet = await this._walletRepository.create(new Wallet({ userId }));
    }
    return wallet;
  }
}
