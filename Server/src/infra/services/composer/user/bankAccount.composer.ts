import { IBankAccountController } from '../../../../interfaces/http/controllers/IBankAccountController';
import { BankAccountController } from '../../../../interfaces/http/controllers/bankAccount.controller';
import { AddBankAccountUseCase } from '../../../../application/usecases/User/BankAccount/AddBankAccount';
import { GetBankAccountsUseCase } from '../../../../application/usecases/User/BankAccount/GetBankAccountsUseCase';
import { MongoUserRepository } from '../../../repositories/UserRepository';
import { BankAccountRepository } from '../../../repositories/BankAccountRepository';
import { RazorPayPayoutService } from '../../../providers/PayoutService';

export function bankAccountComposer(): IBankAccountController {
  const userRepo = new MongoUserRepository();
  const bankRepo = new BankAccountRepository();
  const payoutService = new RazorPayPayoutService();

  const addUseCase = new AddBankAccountUseCase(userRepo, bankRepo, payoutService);
  const getUseCase = new GetBankAccountsUseCase(bankRepo);

  return new BankAccountController(addUseCase, getUseCase);
}
