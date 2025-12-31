import { HikeStatus } from '../../../../domain/enums/Hike';
import { Forbidden } from '../../../../domain/errors/CustomError';
import {
  ActiveHikeRequiredToCancel,
  ConfirmedHikeCannotCancel,
  HikeNotFound,
} from '../../../../domain/errors/HikeErrors';
import { JoinRequestStatus } from '../../../../domain/enums/Ride';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { IJoinRequestRepository } from '../../../repositories/IJoinRequestsRepository';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { ITransactionManager } from '../../../providers/ITransactionManager';
import {
  CancelHikeReqDTO,
  CancelHikeResDTO,
  ICancelHikeUseCase,
} from './ICancelHikeUseCase';

export class CancelHikeUseCase implements ICancelHikeUseCase {
  constructor(
    private readonly _hikeRepository: IHikeRepository,
    private readonly _joinRequestRepository: IJoinRequestRepository,
    private readonly _rideRepository: IRideRepository,
    private readonly _transactionManager: ITransactionManager
  ) {}

  async execute(data: CancelHikeReqDTO): Promise<CancelHikeResDTO> {
    const hike = await this._hikeRepository.findById(data.hikeId);
    if (!hike) throw new HikeNotFound();
    if (hike.getUserId() !== data.userId) throw new Forbidden();

    // Validate status and confirmation
    if (hike.getStatus() !== HikeStatus.ACTIVE)
      throw new ActiveHikeRequiredToCancel();
    if (hike.getConfirmed() || hike.getBookingId())
      throw new ConfirmedHikeCannotCancel();

    await this._transactionManager.runInTransaction(async () => {
      const requests = await this._joinRequestRepository.findByHikeId(
        data.hikeId
      );

      for (const req of requests) {
        if (req.getStatus() === JoinRequestStatus.ACCEPTED) {
          await this._rideRepository.releaseSeats(
            req.getRideId(),
            req.getSeatsRequested()
          );
        }
        req.updateStatus(JoinRequestStatus.EXPIRED);
        await this._joinRequestRepository.update(req.getId()!, req);
      }

      // Update hike status
      hike.updateStatus(HikeStatus.CANCELLED);
      await this._hikeRepository.update(hike.getHikeId()!, hike);
    });

    return { hikeId: data.hikeId, status: HikeStatus.CANCELLED };
  }
}
