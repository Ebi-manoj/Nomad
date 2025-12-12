import { JoinRequestStatus } from '../../domain/enums/Ride';
import { ILogger } from '../providers/ILogger';
import { IJoinRequestRepository } from '../repositories/IJoinRequestsRepository';
import { IPaymentRepository } from '../repositories/IPaymentRepository';
import { IRideRepository } from '../repositories/IRideRepository';
import { ICleanupSeatsReservation } from './ICleanupSeatsReservation';

export class CleanupSeatsReservation implements ICleanupSeatsReservation {
  constructor(
    private readonly _paymentRepository: IPaymentRepository,
    private readonly _rideRepository: IRideRepository,
    private readonly _joinRequestRepository: IJoinRequestRepository,
    private readonly logger: ILogger
  ) {}

  async execute(): Promise<void> {
    const pendingPayments = await this._paymentRepository.findExpiredPayments();
    for (const payment of pendingPayments) {
      const ride = await this._rideRepository.findById(payment.getRideId());
      const joinRequest = await this._joinRequestRepository.findById(
        payment.getJoinRequestId()
      );

      if (ride && joinRequest) {
        await this._rideRepository.releaseSeats(
          ride.getRideId()!,
          joinRequest.getSeatsRequested()
        );
        joinRequest.updateStatus(JoinRequestStatus.EXPIRED);

        await this._joinRequestRepository.update(
          joinRequest.getId()!,
          joinRequest
        );
      }
      payment.setExpired();
      await this._paymentRepository.update(payment.getId()!, payment);
    }
  }
}
