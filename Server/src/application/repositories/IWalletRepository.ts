import { Wallet } from '../../domain/entities/Wallet';
import { IBaseRepository } from './IBaseRepository';

export interface IWalletRepository extends IBaseRepository<Wallet> {
  findByUserId(userId: string): Promise<Wallet | null>;
  findOrCreateByUserId(userId: string): Promise<Wallet>;
}
