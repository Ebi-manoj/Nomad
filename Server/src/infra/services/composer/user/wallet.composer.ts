import { IWalletController } from '../../../../interfaces/http/controllers/IWalletController';
import { WalletController } from '../../../../interfaces/http/controllers/wallet.controller';
import { GetWalletDetailsUseCase } from '../../../../application/usecases/User/Wallet/GetWalletDetailsUseCase';
import { WalletRepository } from '../../../repositories/WalletRepository';
import { WalletTransactionRepository } from '../../../repositories/WalletTransactionRepository';

export function walletComposer(): IWalletController {
  const walletRepository = new WalletRepository();
  const walletTransactionRepository = new WalletTransactionRepository();

  const getWalletDetailsUseCase = new GetWalletDetailsUseCase(
    walletRepository,
    walletTransactionRepository
  );

  return new WalletController(getWalletDetailsUseCase);
}
