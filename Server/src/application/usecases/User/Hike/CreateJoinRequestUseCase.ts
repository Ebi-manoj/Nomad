import { CreateJoinRequestDTO } from '../../../../domain/dto/HikeDTO';
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
import { FareCalculator } from '../../../services/FareCalculator';

export class CreateJoinRequestUseCase {
  constructor(
    private readonly joinRequestRepository: IJoinRequestRepository,
    private readonly rideRepository: IRideRepository,
    private readonly hikeRepository: IHikeRepository,
    private readonly fareCalculator: FareCalculator
  ) {}

  async execute(data: CreateJoinRequestDTO): Promise<void> {
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

    const joinRequest = new JoinRequest({ ...data });

    //Create Collection
    await this.joinRequestRepository.create(joinRequest);
  }
}
