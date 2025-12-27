import { MIN_PAYOUT_BALANCE } from '../../../../domain/enums/Constants';
import { PayoutMode } from '../../../../domain/dto/Payouts';
import { Payout } from '../../../../domain/entities/Payout';
import {
  FundAccountIdNotFound,
  PrimaryAccountNotFound,
} from '../../../../domain/errors/BankAccountError';
import { UserNotFound } from '../../../../domain/errors/CustomError';
import {
  InsufficientBalanceForWithDraw,
  PayoutContactIdNotFound,
} from '../../../../domain/errors/PayoutError';
import { IPayoutService } from '../../../providers/IPayoutService';
import { ITransactionManager } from '../../../providers/ITransactionManager';
import { IBankAccountRepository } from '../../../repositories/IBankAccountRepository';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { IWalletRepository } from '../../../repositories/IWalletRepository';
import { IWithDrawMoneyUseCase } from './IWithDrawMoneyUseCase';
import { IPayoutRepository } from '../../../repositories/IPayoutRepository';
import { WalletTransaction } from '../../../../domain/entities/WalletTransaction';
import {
  TransactionReferenceType,
  WalletTransactionStatus,
  WalletTransactionType,
} from '../../../../domain/enums/Wallet';
import { IWalletTransactionRepository } from '../../../repositories/IWalletTransactionRepository';

export class WithDrawMoneyUseCase implements IWithDrawMoneyUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _walletRepository: IWalletRepository,
    private readonly _bankRepository: IBankAccountRepository,
    private readonly _payoutService: IPayoutService,
    private readonly _payoutRepository: IPayoutRepository,
    private readonly _transactionRepository: IWalletTransactionRepository,
    private readonly _transactionManager: ITransactionManager
  ) {}
  async execute(userId: string): Promise<void> {
    await this._transactionManager.runInTransaction(async () => {
      const user = await this._userRepository.findById(userId);
      if (!user) throw new UserNotFound();

      const wallet = await this._walletRepository.findByUserId(userId);
      if (!wallet || wallet.getBalance() < MIN_PAYOUT_BALANCE)
        throw new InsufficientBalanceForWithDraw();

      console.log(userId);

      const primaryBank = await this._bankRepository.findUserPrimary(userId);
      if (!primaryBank) throw new PrimaryAccountNotFound();

      const fundAccountId = primaryBank.getFundAccountId();
      if (!fundAccountId) throw new FundAccountIdNotFound();

      const contactId = user.getPayoutContactId();
      if (!contactId) throw new PayoutContactIdNotFound();

      const referenceId = `wd_${userId}}`;
      const amount = wallet.getBalance();
      const payoutRes = await this._payoutService.createPayout({
        fundAccountId,
        amount,
        currency: wallet.getCurrency(),
        mode: PayoutMode.IMPS,
        purpose: 'payout',
        narration: 'Wallet withdrawal',
        referenceId,
      });

      const transaction = new WalletTransaction({
        userId,
        referenceType: TransactionReferenceType.PAYOUT,
        referenceId: payoutRes.id,
        amount,
        type: WalletTransactionType.DEBIT,
        description: 'Withdrawl of money',
        status: WalletTransactionStatus.PROCESSING,
        metadata: {
          fundAccountId,
          contactId,
        },
      });

      const createdTransaction = await this._transactionRepository.create(
        transaction
      );

      const payout = new Payout({
        userId,
        transactionId: createdTransaction.getId() as string,
        razorpayPayoutId: payoutRes.id,
        contactId,
        fundAccountId,
        amount: payoutRes.amount,
        mode: PayoutMode.IMPS,
        status: payoutRes.status,
        utr: payoutRes.utr,
      });
      wallet.debit(amount);
      await this._walletRepository.update(wallet.getId() as string, wallet);
      await this._payoutRepository.create(payout);
    });
  }
}
