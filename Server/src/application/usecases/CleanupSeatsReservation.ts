import { JoinRequestStatus } from '../../domain/enums/Ride';
import { ILogger } from '../providers/ILogger';
import { IJoinRequestRepository } from '../repositories/IJoinRequestsRepository';
import { IPaymentRepository } from '../repositories/IPaymentRepository';
import { IRideRepository } from '../repositories/IRideRepository';
import { ICleanupSeatsReservation } from './ICleanupSeatsReservation';

export class CleanupSeatsReservation implements ICleanupSeatsReservation {
  constructor(
    private readonly paymentRepository: IPaymentRepository,
    private readonly rideRepository: IRideRepository,
    private readonly joinRequestRepository: IJoinRequestRepository,
    private readonly logger: ILogger
  ) {}

  async execute(): Promise<void> {
    this.logger.info('Cleanup reserved seats executing');

    const pendingPayments = await this.paymentRepository.findExpiredPayments();
    for (const payment of pendingPayments) {
      const ride = await this.rideRepository.findById(payment.getRideId());
      const joinRequest = await this.joinRequestRepository.findById(
        payment.getJoinRequestId()
      );

      if (ride && joinRequest) {
        await this.rideRepository.releaseSeats(
          ride.getRideId()!,
          joinRequest.getSeatsRequested()
        );
        joinRequest.updateStatus(JoinRequestStatus.EXPIRED);

        await this.joinRequestRepository.update(
          joinRequest.getId()!,
          joinRequest
        );
      }
      payment.setExpired();
      await this.paymentRepository.update(payment.getId()!, payment);
    }
    this.logger.info('Cleanup reserved seats finshed');
  }
}
