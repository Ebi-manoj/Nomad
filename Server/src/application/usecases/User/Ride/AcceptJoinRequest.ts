import {
  AcceptJoinRequestDTO,
  AcceptJoinResponseDTO,
} from '../../../../domain/dto/RideMatch';
import { Payment } from '../../../../domain/entities/Payment';
import { PaymentStatus } from '../../../../domain/enums/payment';
import { JoinRequestStatus } from '../../../../domain/enums/Ride';
import { UpdateFailed } from '../../../../domain/errors/CustomError';
import { HikeNotFound } from '../../../../domain/errors/HikeErrors';
import {
  JoinRequestNotFound,
  NotAuthorizedToAccept,
} from '../../../../domain/errors/JoinRequestError';
import { RideNotFound } from '../../../../domain/errors/RideErrors';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { IJoinRequestRepository } from '../../../repositories/IJoinRequestsRepository';
import { IPaymentRepository } from '../../../repositories/IPaymentRepository';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { FareCalculator } from '../../../services/FareCalculator';
import { IAcceptJoinRequestUseCase } from './IAcceptJoinRequest';
import { IRealtimeGateway } from '../../../providers/IRealtimeGateway';
import { ISubscriptionUsageService } from '../../../services/ISubscriptionUsageService';
import { ISubscriptionValidator } from '../../../services/ISubscriptionValidator';

export class AcceptJoinRequestUseCase implements IAcceptJoinRequestUseCase {
  constructor(
    private readonly _hikeRepository: IHikeRepository,
    private readonly _rideRepository: IRideRepository,
    private readonly _joinRequestRepository: IJoinRequestRepository,
    private readonly _paymentRepository: IPaymentRepository,
    private readonly _fareCalculator: FareCalculator,
    private readonly _realtimeGateway: IRealtimeGateway,
    private readonly _subscriptionValidator: ISubscriptionValidator,
    private readonly _usageService: ISubscriptionUsageService
  ) {}

  async execute(data: AcceptJoinRequestDTO): Promise<AcceptJoinResponseDTO> {
    await this._subscriptionValidator.validateRideAcceptance(data.riderId);

    const joinRequest = await this._joinRequestRepository.findById(
      data.joinRequestId
    );
    if (!joinRequest || joinRequest.getStatus() !== JoinRequestStatus.PENDING) {
      throw new JoinRequestNotFound();
    }

    const hike = await this._hikeRepository.findById(joinRequest.getHikeId());
    const ride = await this._rideRepository.findById(joinRequest.getRideId());
    if (!hike) throw new HikeNotFound();
    if (!ride) throw new RideNotFound();

    if (data.riderId != ride.getRiderId()) throw new NotAuthorizedToAccept();

    const updated = await this._rideRepository.updateWithLock(
      ride.getRideId()!,
      async lockride => {
        lockride.reserveSeats(hike.getSeatsRequested());
        return lockride;
      }
    );
    const { features } = await this._subscriptionValidator.getActiveSubscription(
      hike.getUserId()
    );
    const platformFeePerc = features.getPlatformFeePercentage();
    const { platformFee, totalAmount } = this._fareCalculator.getHikerAmount(
      joinRequest.getCostSharing(),
      platformFeePerc
    );
    try {
      const payment = new Payment({
        joinRequestId: joinRequest.getId()!,
        hikerId: hike.getUserId(),
        riderId: ride.getRiderId(),
        hikeId: hike.getHikeId()!,
        rideId: ride.getRideId()!,
        amount: totalAmount,
        platformFee,
        status: PaymentStatus.PENDING,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      });
      joinRequest.accept();
      const [updatedJoinRequest, savedPayment] = await Promise.all([
        this._joinRequestRepository.update(joinRequest.getId(), joinRequest),
        this._paymentRepository.create(payment),
      ]);
      if (!updatedJoinRequest) throw new UpdateFailed();

      const response = {
        joinRequestId: updatedJoinRequest.getId()!,
        paymentId: savedPayment.getId()!,
        hikerId: hike.getUserId(),
        hikeId: hike.getHikeId()!,
        amount: payment.getAmount(),
        platformFee: payment.getPlatformFee(),
        status: updatedJoinRequest.getStatus(),
        expiresAt: payment.getExpiresAt(),
      };
      this._usageService.incrementRideAccepetance(data.riderId);

      await this._realtimeGateway.emitToRoom(
        'hiker',
        response.hikeId,
        'joinRequest:accepted',
        response
      );

      return response;
    } catch (error) {
      await this._rideRepository.releaseSeats(
        ride.getRideId()!,
        hike.getSeatsRequested()
      );
      throw error;
    }
  }
}
