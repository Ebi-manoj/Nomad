import {
  AddBankAccountDTO,
  BankAccountResponseDTO,
} from '../../../../domain/dto/bankAccountDTO';

export interface IAddBankAccountUseCase {
  execute(data: AddBankAccountDTO): Promise<BankAccountResponseDTO>;
}
