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
import { UserRepository } from '../../../repositories/UserRepository';
import { FareCalculator } from '../../../services/FareCalculator';
import { joinRequestMapper } from '../../../mappers/JoinRequestMapper';
import { UserNotFound } from '../../../../domain/errors/CustomError';
import { JoinRequestStatus } from '../../../../domain/enums/Ride';

export class CreateJoinRequestUseCase {
  constructor(
    private readonly joinRequestRepository: IJoinRequestRepository,
    private readonly rideRepository: IRideRepository,
    private readonly hikeRepository: IHikeRepository,
    private readonly fareCalculator: FareCalculator,
    private readonly userRepository: UserRepository
  ) {}

  async execute(data: CreateJoinRequestDTO): Promise<JoinRequestResponseDTO> {
    const ride = await this.rideRepository.findById(data.rideId);
    const hike = await this.hikeRepository.findById(data.hikeId);
    if (!ride) throw new RideNotFound();
    if (!hike) throw new HikeNotFound();

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
    });

    //Create Collection
    const saved = await this.joinRequestRepository.create(joinRequest);
    const user = await this.userRepository.findById(hike.getUserId());
    if (!user) throw new UserNotFound();
    return joinRequestMapper(saved, hike, user);
  }
}
