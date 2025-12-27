import { BankAccountResponseDTO } from '../../../../domain/dto/bankAccountDTO';

export interface IGetBankAccountsUseCase {
  execute(userId: string): Promise<BankAccountResponseDTO[]>;
}
