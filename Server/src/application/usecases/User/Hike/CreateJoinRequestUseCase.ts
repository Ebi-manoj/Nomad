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
import { ISubscriptionUsageService } from '../../../services/ISubscriptionUsageService';

export class CreateJoinRequestUseCase implements ICreateJoinRequestUseCase {
  constructor(
    private readonly _joinRequestRepository: IJoinRequestRepository,
    private readonly _rideRepository: IRideRepository,
    private readonly _hikeRepository: IHikeRepository,
    private readonly _fareCalculator: FareCalculator,
    private readonly _userRepository: IUserRepository,
    private readonly _realtimeGateway: IRealtimeGateway,
    private readonly _subscriptionValidator: ISubscriptionValidator,
    private readonly _usageService: ISubscriptionUsageService
  ) {}

  async execute(data: CreateJoinRequestDTO): Promise<JoinRequestResponseDTO> {
    const ride = await this._rideRepository.findById(data.rideId);
    const hike = await this._hikeRepository.findById(data.hikeId);
    if (!ride) throw new RideNotFound();
    if (!hike) throw new HikeNotFound();

    await this._subscriptionValidator.validateJoinRequest(
      data.hikeId,
      hike.getUserId()
    );

    //Seats availability
    if (hike.getSeatsRequested() > ride.getSeatsAvailable())
      throw new SeatsNotAvailable();

    const hasPendingRequest =
      await this._joinRequestRepository.checkPendingRequest(
        data.hikeId,
        data.rideId
      );
    if (hasPendingRequest) throw new HasPendingRequest();

    const costSharing = this._fareCalculator.getFare(
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
    const saved = await this._joinRequestRepository.create(joinRequest);
    const user = await this._userRepository.findById(hike.getUserId());
    if (!user) throw new UserNotFound();
    const sub = await this._subscriptionValidator.getActiveSubscription(
      hike.getUserId()
    );
    const response = joinRequestMapper(saved, hike, user, sub.tier);

    await this._realtimeGateway.emitToRoom(
      'rider',
      response.rideId,
      'join-request:new',
      response
    );
    this._usageService.incrementJoinRequest(response.hiker.id);

    return response;
  }
}
