import { RideBooking } from '../../domain/entities/RideBooking';
import { IWalletRepository } from '../repositories/IWalletRepository';
import { IWalletTransactionRepository } from '../repositories/IWalletTransactionRepository';
import { ITransactionManager } from '../providers/ITransactionManager';
import { WalletTransaction } from '../../domain/entities/WalletTransaction';
import {
  TransactionReferenceType,
  WalletTransactionStatus,
  WalletTransactionType,
} from '../../domain/enums/Wallet';
import { IBookingCancelRefundService } from './IBookingCancelRefundService';

export class BookingCancelRefundService implements IBookingCancelRefundService {
  constructor(
    private readonly _walletRepository: IWalletRepository,
    private readonly _walletTxRepository: IWalletTransactionRepository,
    private readonly _transactionManager: ITransactionManager
  ) {}

  async execute(booking: RideBooking, refundAmount: number): Promise<void> {
    if (!refundAmount || refundAmount <= 0) return;

    await this._transactionManager.runInTransaction(async () => {
      const userId = booking.getHikerId();
      const wallet = await this._walletRepository.findOrCreateByUserId(userId);
      wallet.credit(refundAmount);
      await this._walletRepository.update(wallet.getId() as string, wallet);

      const transaction = new WalletTransaction({
        userId,
        referenceType: TransactionReferenceType.REFUND,
        referenceId: booking.getId()!,
        amount: refundAmount,
        type: WalletTransactionType.CREDIT,
        description: 'Booking cancellation refund',
        status: WalletTransactionStatus.SUCCESS,
        metadata: {
          rideId: booking.getRideId(),
          hikeId: booking.getHikeId(),
          bookingNumber: booking.getBookingNumber(),
        },
      });

      await this._walletTxRepository.create(transaction);
    });
  }
}
