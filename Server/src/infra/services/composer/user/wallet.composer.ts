import { IWalletController } from '../../../../interfaces/http/controllers/IWalletController';
import { WalletController } from '../../../../interfaces/http/controllers/wallet.controller';
import { GetWalletDetailsUseCase } from '../../../../application/usecases/User/Wallet/GetWalletDetailsUseCase';
import { WalletRepository } from '../../../repositories/WalletRepository';
import { WalletTransactionRepository } from '../../../repositories/WalletTransactionRepository';
import { WithDrawMoneyUseCase } from '../../../../application/usecases/User/Wallet/WithDrawMoneyUseCase';
import { MongoUserRepository } from '../../../repositories/UserRepository';
import { BankAccountRepository } from '../../../repositories/BankAccountRepository';
import { RazorPayPayoutService } from '../../../providers/PayoutService';
import { PayoutRepository } from '../../../repositories/PayoutRepository';
import { MongoTransactionManager } from '../../../database/MongoTransactionManger';

export function walletComposer(): IWalletController {
  const walletRepository = new WalletRepository();
  const walletTransactionRepository = new WalletTransactionRepository();
  const userRepository = new MongoUserRepository();
  const bankAccountRepository = new BankAccountRepository();
  const payoutService = new RazorPayPayoutService();
  const payoutRepository = new PayoutRepository();
  const transactionManager = new MongoTransactionManager([
    walletRepository,
    walletTransactionRepository,
    bankAccountRepository,
    payoutRepository,
    userRepository,
  ]);

  const getWalletDetailsUseCase = new GetWalletDetailsUseCase(
    walletRepository,
    walletTransactionRepository
  );

  const withdrawUseCase = new WithDrawMoneyUseCase(
    userRepository,
    walletRepository,
    bankAccountRepository,
    payoutService,
    payoutRepository,
    walletTransactionRepository,
    transactionManager
  );

  return new WalletController(getWalletDetailsUseCase, withdrawUseCase);
}
