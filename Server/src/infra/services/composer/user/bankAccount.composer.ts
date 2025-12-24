import { IBankAccountController } from '../../../../interfaces/http/controllers/IBankAccountController';
import { BankAccountController } from '../../../../interfaces/http/controllers/bankAccount.controller';
import { AddBankAccountUseCase } from '../../../../application/usecases/User/BankAccount/AddBankAccount';
import { GetBankAccountsUseCase } from '../../../../application/usecases/User/BankAccount/GetBankAccountsUseCase';
import { SetPrimaryBankAccountUseCase } from '../../../../application/usecases/User/BankAccount/SetPrimaryBankAccountUseCase';
import { DeleteBankAccountUseCase } from '../../../../application/usecases/User/BankAccount/DeleteBankAccountUseCase';
import { MongoUserRepository } from '../../../repositories/UserRepository';
import { BankAccountRepository } from '../../../repositories/BankAccountRepository';
import { RazorPayPayoutService } from '../../../providers/PayoutService';

export function bankAccountComposer(): IBankAccountController {
  const userRepo = new MongoUserRepository();
  const bankRepo = new BankAccountRepository();
  const payoutService = new RazorPayPayoutService();

  const addUseCase = new AddBankAccountUseCase(userRepo, bankRepo, payoutService);
  const getUseCase = new GetBankAccountsUseCase(bankRepo);
  const setPrimaryUseCase = new SetPrimaryBankAccountUseCase(bankRepo);
  const deleteUseCase = new DeleteBankAccountUseCase(bankRepo);

  return new BankAccountController(
    addUseCase,
    getUseCase,
    setPrimaryUseCase,
    deleteUseCase
  );
}
