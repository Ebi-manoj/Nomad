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
import { IRealtimeGateway } from '../../../providers/IRealtimeGateway';

export class DeclineJoinRequestUseCase implements IDeclineJoinRequestUseCase {
  constructor(
    private readonly _joinRequestRepository: IJoinRequestRepository,
    private readonly _rideRepository: IRideRepository,
    private readonly _realtimeGateway: IRealtimeGateway
  ) {}
  async execute(data: DeclineJoinRequestDTO): Promise<DeclineJoinResponseDTO> {
    const joinRequest = await this._joinRequestRepository.findById(
      data.joinRequestId
    );
    if (!joinRequest) throw new JoinRequestNotFound();

    if (joinRequest.getStatus() !== JoinRequestStatus.PENDING)
      throw new InvalidJoinRequestStatus();

    const ride = await this._rideRepository.findById(joinRequest.getRideId());
    if (!ride) throw new RideNotFound();

    if (ride.getRiderId() !== data.riderId) throw new NotAuthorizedToAccept();
    joinRequest.updateStatus(JoinRequestStatus.DECLINED);

    const updated = await this._joinRequestRepository.update(
      joinRequest.getId(),
      joinRequest
    );
    if (!updated) throw new UpdateFailed();

    const response = {
      joinRequestId: updated.getId()!,
      rideId: ride.getRideId()!,
      hikeId: updated.getHikeId(),
      status: updated.getStatus(),
    };

    await this._realtimeGateway.emitToRoom(
      'hiker',
      response.hikeId,
      'joinRequest:declined',
      response
    );

    return response;
  }
}
