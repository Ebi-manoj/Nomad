import {
  CreateJoinRequestDTO,
  JoinRequestResponseDTO,
} from '../../../../domain/dto/HikeDTO';
import { JoinRequest } from '../../../../domain/entities/JoinRequests';
import {
  HasPendingRequest,
  HikeNotFound,
  SeatsNotAvailable,
} from '../../../../domain/errors/HikeErrors';
import { RideNotFound } from '../../../../domain/errors/RideErrors';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { IJoinRequestRepository } from '../../../repositories/IJoinRequestsRepository';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { FareCalculator } from '../../../services/FareCalculator';
import { joinRequestMapper } from '../../../mappers/JoinRequestMapper';
import { UserNotFound } from '../../../../domain/errors/CustomError';
import { JoinRequestStatus } from '../../../../domain/enums/Ride';
import { ICreateJoinRequestUseCase } from './ICreateJoinRequestUseCase';
import { IRealtimeGateway } from '../../../providers/IRealtimeGateway';
import { ISubscriptionValidator } from '../../../services/ISubscriptionValidator';

export class CreateJoinRequestUseCase implements ICreateJoinRequestUseCase {
  constructor(
    private readonly joinRequestRepository: IJoinRequestRepository,
    private readonly rideRepository: IRideRepository,
    private readonly hikeRepository: IHikeRepository,
    private readonly fareCalculator: FareCalculator,
    private readonly userRepository: IUserRepository,
    private readonly realtimeGateway: IRealtimeGateway,
    private readonly subscriptionValidator: ISubscriptionValidator
  ) {}

  async execute(data: CreateJoinRequestDTO): Promise<JoinRequestResponseDTO> {
    const ride = await this.rideRepository.findById(data.rideId);
    const hike = await this.hikeRepository.findById(data.hikeId);
    if (!ride) throw new RideNotFound();
    if (!hike) throw new HikeNotFound();

    await this.subscriptionValidator.validateJoinRequest(
      data.hikeId,
      hike.getUserId()
    );

    //Seats availability
    if (hike.getSeatsRequested() > ride.getSeatsAvailable())
      throw new SeatsNotAvailable();

    const hasPendingRequest =
      await this.joinRequestRepository.checkPendingRequest(
        data.hikeId,
        data.rideId
      );
    if (hasPendingRequest) throw new HasPendingRequest();

    const costSharing = this.fareCalculator.getFare(
      ride.getCostSharing(),
      hike.getTotalDistance()
    );
    const joinRequest = new JoinRequest({
      ...data,
      costSharing,
      status: JoinRequestStatus.PENDING,
      seatsRequested: hike.getSeatsRequested(),
    });

    //Create Collection
    const saved = await this.joinRequestRepository.create(joinRequest);
    const user = await this.userRepository.findById(hike.getUserId());
    if (!user) throw new UserNotFound();
    const sub = await this.subscriptionValidator.getActiveSubscription(
      hike.getUserId()
    );
    const response = joinRequestMapper(saved, hike, user, sub.tier);

    await this.realtimeGateway.emitToRoom(
      'rider',
      response.rideId,
      'join-request:new',
      response
    );

    return response;
  }
}
