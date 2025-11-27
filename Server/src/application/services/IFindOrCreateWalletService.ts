import { Wallet } from '../../domain/entities/Wallet';

export interface IFindOrCreateWalletService {
  execute(userId: string): Promise<Wallet>;
}
