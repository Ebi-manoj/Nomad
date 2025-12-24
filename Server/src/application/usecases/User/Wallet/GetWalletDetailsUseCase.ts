import { WalletDetailsDTO } from '../../../../domain/dto/WalletDTO';
import { Wallet } from '../../../../domain/entities/Wallet';
import { IWalletRepository } from '../../../repositories/IWalletRepository';
import { IWalletTransactionRepository } from '../../../repositories/IWalletTransactionRepository';

export class GetWalletDetailsUseCase {
  constructor(
    private readonly _walletRepository: IWalletRepository,
    private readonly _walletTransactionRepository: IWalletTransactionRepository
  ) {}

  async execute(userId: string, page: number = 1): Promise<WalletDetailsDTO> {
    const LIMIT = 10;
    let wallet = await this._walletRepository.findByUserId(userId);
    if (!wallet) {
      const walletEntity = new Wallet({ userId });
      wallet = await this._walletRepository.create(walletEntity);
    }

    const skip = (page - 1) * LIMIT;
    const [transactions, total] = await Promise.all([
      this._walletTransactionRepository.findByUserId(userId, skip, LIMIT),
      this._walletTransactionRepository.countByUserId(userId),
    ]);

    const [totalCredits, totalDebits] = await Promise.all([
      this._walletTransactionRepository.findTotalCredits(userId),
      this._walletTransactionRepository.findTotalDebits(userId),
    ]);

    return {
      balance: wallet.getBalance(),
      currency: wallet.getCurrency(),
      transactions: transactions.map(t => ({
        id: t.getId()!,
        referenceType: t.getReferenceType(),
        referenceId: t.getReferenceId(),
        amount: t.getAmount(),
        type: t.getType(),
        description: t.getDescription(),
        status: t.getStatus(),
        createdAt: t.getCreatedAt(),
      })),
      totalCredits,
      totalDebits,
      pagination: {
        total,
      },
    };
  }
}
