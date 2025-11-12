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

export class AcceptJoinRequestUseCase implements IAcceptJoinRequestUseCase {
  constructor(
    private readonly hikeRepository: IHikeRepository,
    private readonly rideRepository: IRideRepository,
    private readonly joinRequestRepository: IJoinRequestRepository,
    private readonly paymentRepository: IPaymentRepository,
    private readonly fareCalculator: FareCalculator,
    private readonly realtimeGateway: IRealtimeGateway
  ) {}

  async execute(data: AcceptJoinRequestDTO): Promise<AcceptJoinResponseDTO> {
    const joinRequest = await this.joinRequestRepository.findById(
      data.joinRequestId
    );
    if (!joinRequest || joinRequest.getStatus() !== JoinRequestStatus.PENDING) {
      throw new JoinRequestNotFound();
    }

    const hike = await this.hikeRepository.findById(joinRequest.getHikeId());
    const ride = await this.rideRepository.findById(joinRequest.getRideId());
    if (!hike) throw new HikeNotFound();
    if (!ride) throw new RideNotFound();

    if (data.riderId != ride.getRiderId()) throw new NotAuthorizedToAccept();

    const updated = await this.rideRepository.updateWithLock(
      ride.getRideId()!,
      async lockride => {
        lockride.reserveSeats(hike.getSeatsRequested());
        return lockride;
      }
    );
    const { platformFee, totalAmount } = this.fareCalculator.getHikerAmount(
      joinRequest.getCostSharing()
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
        this.joinRequestRepository.update(joinRequest.getId(), joinRequest),
        this.paymentRepository.create(payment),
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

      await this.realtimeGateway.emitToRoom(
        'hiker',
        response.hikeId,
        'joinRequest:accepted',
        response
      );

      return response;
    } catch (error) {
      await this.rideRepository.releaseSeats(
        ride.getRideId()!,
        hike.getSeatsRequested()
      );
      console.log(error);
      throw error;
    }
  }
}
