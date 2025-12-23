import { BankAccount } from '../../domain/entities/BankAccount';
import { IBaseRepository } from './IBaseRepository';

export interface IBankAccountRepository extends IBaseRepository<BankAccount> {
  findByUserId(userId: string): Promise<BankAccount[]>;
}
