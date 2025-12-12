import { EndRideReqDTO, EndRideResDTO } from '../../../../domain/dto/RideDTO';
import { RideStatus } from '../../../../domain/enums/Ride';
import { Forbidden, UpdateFailed } from '../../../../domain/errors/CustomError';
import {
  RideHavePendingTasks,
  RideIsNotActiveStatus,
  RideNotFound,
} from '../../../../domain/errors/RideErrors';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { ITaskRepository } from '../../../repositories/ITaskRepository';
import { IRideBookingRepository } from '../../../repositories/IRideBooking';
import { IWalletRepository } from '../../../repositories/IWalletRepository';
import { IWalletTransactionRepository } from '../../../repositories/IWalletTransactionRepository';
import { ITransactionManager } from '../../../providers/ITransactionManager';
import {
  TransactionReferenceType,
  WalletTransactionType,
} from '../../../../domain/enums/Wallet';
import { WalletTransaction } from '../../../../domain/entities/WalletTransaction';
import { IFindOrCreateWalletService } from '../../../services/IFindOrCreateWalletService';
import { IEndRideUseCase } from './IEndRideUseCase';
import { IFareCalculator } from '../../../services/IFareCalculator';
import { ISubscriptionService } from '../../../services/ISubscriptionService';

export class EndRideUseCase implements IEndRideUseCase {
  constructor(
    private readonly _rideRepository: IRideRepository,
    private readonly _taskRepository: ITaskRepository,
    private readonly _rideBookingRepository: IRideBookingRepository,
    private readonly _walletRepository: IWalletRepository,
    private readonly _walletTransactionRepository: IWalletTransactionRepository,
    private readonly _walletService: IFindOrCreateWalletService,
    private readonly _transactionManager: ITransactionManager,
    private readonly _fareCalculator: IFareCalculator,
    private readonly _subscriptionService: ISubscriptionService
  ) {}

  async execute(data: EndRideReqDTO): Promise<EndRideResDTO> {
    return this._transactionManager.runInTransaction<EndRideResDTO>(
      async () => {
        const ride = await this._rideRepository.findById(data.rideId);
        if (!ride) throw new RideNotFound();

        if (ride.getStatus() !== RideStatus.ACTIVE)
          throw new RideIsNotActiveStatus();

        if (ride.getRiderId() !== data.userId) throw new Forbidden();

        const pendingTask = await this._taskRepository.findPendingTasks(
          data.rideId
        );
        if (pendingTask.length) throw new RideHavePendingTasks();

        const totalCostShared =
          await this._rideBookingRepository.getTotalCostShareOfRide(
            data.rideId
          );
        const { features } =
          await this._subscriptionService.getActiveSubscription(
            ride.getRiderId()
          );
        const platformFeePerc = features.getPlatformFeePercentage();
        const { totalEarning, platformFee } =
          this._fareCalculator.getRiderEarning(
            totalCostShared,
            platformFeePerc
          );
        ride.setEarnings(totalEarning, platformFee);
        ride.complete();

        const updatedRide = await this._rideRepository.update(
          ride.getRideId()!,
          ride
        );
        if (!updatedRide) throw new UpdateFailed();

        if (totalEarning > 0) {
          const wallet = await this._walletService.execute(data.userId);
          wallet.credit(totalEarning);

          const savedWallet = await this._walletRepository.update(
            wallet.getId(),
            wallet
          );
          if (!savedWallet) throw new UpdateFailed('Failed to update wallet');

          const transaction = new WalletTransaction({
            userId: data.userId,
            referenceType: TransactionReferenceType.RIDE,
            referenceId: data.rideId,
            amount: totalEarning,
            type: WalletTransactionType.CREDIT,
            description: `Earnings for ride`,
          });

          await this._walletTransactionRepository.create(transaction);
        }

        return {
          rideId: updatedRide.getRideId()!,
          status: updatedRide.getStatus(),
        };
      }
    );
  }
}
