import {
  DeclineJoinRequestDTO,
  DeclineJoinResponseDTO,
} from '../../../../domain/dto/RideMatch';
import { JoinRequestStatus } from '../../../../domain/enums/Ride';
import { UpdateFailed } from '../../../../domain/errors/CustomError';
import {
  InvalidJoinRequestStatus,
  JoinRequestNotFound,
  NotAuthorizedToAccept,
} from '../../../../domain/errors/JoinRequestError';
import { RideNotFound } from '../../../../domain/errors/RideErrors';
import { IJoinRequestRepository } from '../../../repositories/IJoinRequestsRepository';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { IDeclineJoinRequestUseCase } from './IDeclineJoinRequest';

export class DeclineJoinRequestUseCase implements IDeclineJoinRequestUseCase {
  constructor(
    private readonly joinRequestRepository: IJoinRequestRepository,
    private readonly rideRepository: IRideRepository
  ) {}
  async execute(data: DeclineJoinRequestDTO): Promise<DeclineJoinResponseDTO> {
    const joinRequest = await this.joinRequestRepository.findById(
      data.joinRequestId
    );
    if (!joinRequest) throw new JoinRequestNotFound();

    if (joinRequest.getStatus() !== JoinRequestStatus.PENDING)
      throw new InvalidJoinRequestStatus();

    const ride = await this.rideRepository.findById(joinRequest.getRideId());
    if (!ride) throw new RideNotFound();

    if (ride.getRiderId() !== data.riderId) throw new NotAuthorizedToAccept();
    joinRequest.updateStatus(JoinRequestStatus.DECLINED);

    const updated = await this.joinRequestRepository.update(
      joinRequest.getId(),
      joinRequest
    );
    if (!updated) throw new UpdateFailed();

    return {
      joinRequestId: updated.getId()!,
      rideId: ride.getRideId()!,
      hikeId: updated.getHikeId(),
      status: updated.getStatus(),
    };
  }
}
