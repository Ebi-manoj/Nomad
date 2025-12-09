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
    private readonly rideRepository: IRideRepository,
    private readonly taskRepository: ITaskRepository,
    private readonly rideBookingRepository: IRideBookingRepository,
    private readonly walletRepository: IWalletRepository,
    private readonly walletTransactionRepository: IWalletTransactionRepository,
    private readonly walletService: IFindOrCreateWalletService,
    private readonly transactionManager: ITransactionManager,
    private readonly fareCalculator: IFareCalculator,
    private readonly subscriptionService: ISubscriptionService
  ) {}

  async execute(data: EndRideReqDTO): Promise<EndRideResDTO> {
    return this.transactionManager.runInTransaction<EndRideResDTO>(async () => {
      const ride = await this.rideRepository.findById(data.rideId);
      if (!ride) throw new RideNotFound();

      if (ride.getStatus() !== RideStatus.ACTIVE)
        throw new RideIsNotActiveStatus();

      if (ride.getRiderId() !== data.userId) throw new Forbidden();

      const pendingTask = await this.taskRepository.findPendingTasks(
        data.rideId
      );
      if (pendingTask.length) throw new RideHavePendingTasks();

      const totalCostShared =
        await this.rideBookingRepository.getTotalCostShareOfRide(data.rideId);
      const { features } = await this.subscriptionService.getActiveSubscription(
        ride.getRiderId()
      );
      const platformFeePerc = features.getPlatformFeePercentage();
      const { totalEarning, platformFee } = this.fareCalculator.getRiderEarning(
        totalCostShared,
        platformFeePerc
      );
      ride.setEarnings(totalEarning, platformFee);
      ride.complete();

      const updatedRide = await this.rideRepository.update(
        ride.getRideId()!,
        ride
      );
      if (!updatedRide) throw new UpdateFailed();

      if (totalEarning > 0) {
        const wallet = await this.walletService.execute(data.userId);
        wallet.credit(totalEarning);

        const savedWallet = await this.walletRepository.update(
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

        await this.walletTransactionRepository.create(transaction);
      }

      return {
        rideId: updatedRide.getRideId()!,
        status: updatedRide.getStatus(),
      };
    });
  }
}
