import {
  GetHikersMatchedReqDTO,
  GetHikersMatchedResponseDTO,
} from '../../../../domain/dto/RideDTO';
import { Unauthorized } from '../../../../domain/errors/CustomError';
import { RideNotFound } from '../../../../domain/errors/RideErrors';
import { hikersMatchedMapper } from '../../../mappers/HikersMatchedMapper';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { IRideBookingRepository } from '../../../repositories/IRideBooking';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { ISubscriptionService } from '../../../services/ISubscriptionService';
import { IGetHikerMatchedUseCase } from './IGetHikersMatched';

export class GetHikersMatchedUseCase implements IGetHikerMatchedUseCase {
  constructor(
    private readonly _rideRepository: IRideRepository,
    private readonly _ridebookingRepository: IRideBookingRepository,
    private readonly _hikeRepository: IHikeRepository,
    private readonly _userRepository: IUserRepository,
    private readonly _subscriptionService: ISubscriptionService
  ) {}

  async execute(
    data: GetHikersMatchedReqDTO
  ): Promise<GetHikersMatchedResponseDTO[]> {
    const ride = await this._rideRepository.findById(data.rideId);
    if (!ride) throw new RideNotFound();

    if (ride.getRiderId() !== data.userId) throw new Unauthorized();

    const rideBookings = await this._ridebookingRepository.findByRideId(
      data.rideId
    );

    const response = [];

    for (const booking of rideBookings) {
      const [hike, user] = await Promise.all([
        this._hikeRepository.findById(booking.getHikeId()),
        this._userRepository.findById(booking.getHikerId()),
      ]);
      if (hike && user) {
        const sub = await this._subscriptionService.getActiveSubscription(
          user.getId()!
        );
        const dto = hikersMatchedMapper(
          user,
          hike,
          booking,
          sub.tier,
          sub.subscription.getBadgeColor()
        );
        response.push(dto);
      }
    }

    return response;
  }
}
