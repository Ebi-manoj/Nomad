import { BankAccountResponseDTO } from '../../../../domain/dto/bankAccountDTO';
import { BankAccountMapper } from '../../../mappers/BankAccount';
import { IBankAccountRepository } from '../../../repositories/IBankAccountRepository';
import { IGetBankAccountsUseCase } from './IGetBankAccounts';

export class GetBankAccountsUseCase implements IGetBankAccountsUseCase {
  constructor(private readonly _bankRepo: IBankAccountRepository) {}

  async execute(userId: string): Promise<BankAccountResponseDTO[]> {
    const accounts = await this._bankRepo.findByUserId(userId);
    return accounts.map(a => BankAccountMapper.toJson(a));
  }
}
