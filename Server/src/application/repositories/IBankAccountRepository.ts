import { BankAccount } from '../../domain/entities/BankAccount';
import { IBaseRepository } from './IBaseRepository';

export interface IBankAccountRepository extends IBaseRepository<BankAccount> {
  findByUserId(userId: string): Promise<BankAccount[]>;
  findByAccountNumber(accntnumber: string): Promise<BankAccount | null>;
  setPrimaryForUser(userId: string, accountId: string): Promise<void>;
  findUserPrimary(userId: string): Promise<BankAccount | null>;
}
