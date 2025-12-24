import { IBankAccountRepository } from '../../../repositories/IBankAccountRepository';
import { ISetPrimaryBankAccountUseCase } from './ISetPrimaryBankAccount';

export class SetPrimaryBankAccountUseCase implements ISetPrimaryBankAccountUseCase {
  constructor(private readonly _bankRepo: IBankAccountRepository) {}

  async execute(userId: string, accountId: string): Promise<void> {
    const account = await this._bankRepo.findById(accountId);
    if (!account || account.getUserId() !== userId) {
      return;
    }
    await this._bankRepo.setPrimaryForUser(userId, accountId);
  }
}
