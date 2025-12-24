import { MongoBaseRepository } from './BaseRepository';
import { IBankAccountRepository } from '../../application/repositories/IBankAccountRepository';
import { BankAccount } from '../../domain/entities/BankAccount';
import { IBankAccountModel, BankAccountModel } from '../database/bankAccount.model';
import { bankAccountMapper } from '../mappers/bankAccountMapper';

export class BankAccountRepository
  extends MongoBaseRepository<BankAccount, IBankAccountModel>
  implements IBankAccountRepository
{
  constructor() {
    super(BankAccountModel, bankAccountMapper);
  }

  async findByUserId(userId: string): Promise<BankAccount[]> {
    const docs = await this.model.find({ userId });
    return docs.map(d => this.mapper.toDomain(d));
  }
  async findByAccountNumber(accntnumber: string): Promise<BankAccount | null> {
    const doc = await this.model.findOne({ accountNumber: accntnumber });
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async setPrimaryForUser(userId: string, accountId: string): Promise<void> {
    const session = this.session || undefined;
    await this.model.updateMany(
      { userId },
      { $set: { isPrimary: false } },
      { session }
    );

    await this.model.findByIdAndUpdate(
      accountId,
      { $set: { isPrimary: true } },
      { session }
    );
  }
}
