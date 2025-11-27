import { Wallet } from '../../domain/entities/Wallet';
import { IWalletRepository } from '../repositories/IWalletRepository';
import { IFindOrCreateWalletService } from './IFindOrCreateWalletService';

export class FindOrCreateWalletService implements IFindOrCreateWalletService {
  constructor(private readonly walletRepository: IWalletRepository) {}

  async execute(userId: string): Promise<Wallet> {
    let wallet = await this.walletRepository.findByUserId(userId);
    if (!wallet) {
      wallet = await this.walletRepository.create(new Wallet({ userId }));
    }
    return wallet;
  }
}
