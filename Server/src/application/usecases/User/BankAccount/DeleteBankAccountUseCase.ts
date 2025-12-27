import { IBankAccountRepository } from '../../../repositories/IBankAccountRepository';
import { IDeleteBankAccountUseCase } from './IDeleteBankAccount';

export class DeleteBankAccountUseCase implements IDeleteBankAccountUseCase {
  constructor(private readonly _bankRepo: IBankAccountRepository) {}

  async execute(userId: string, accountId: string): Promise<void> {
    const account = await this._bankRepo.findById(accountId);
    if (!account) return;
    if (account.getUserId() !== userId) return;
    await this._bankRepo.delete(accountId);
  }
}
