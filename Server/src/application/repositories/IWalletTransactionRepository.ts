import { WalletTransaction } from '../../domain/entities/WalletTransaction';
import { IBaseRepository } from './IBaseRepository';

export interface IWalletTransactionRepository
  extends IBaseRepository<WalletTransaction> {
  findByUserId(
    userId: string,
    skip: number,
    limit: number
  ): Promise<WalletTransaction[]>;
  countByUserId(userId: string): Promise<number>;
  findTotalCredits(userId: string): Promise<number>;
  findTotalDebits(userId: string): Promise<number>;
}
