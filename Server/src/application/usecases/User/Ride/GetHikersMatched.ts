import {
  GetHikersMatchedReqDTO,
  GetHikersMatchedResponseDTO,
} from '../../../../domain/dto/RideDTO';
import { Unauthorized } from '../../../../domain/errors/CustomError';
import { RideNotFound } from '../../../../domain/errors/RideErrors';
import { hikersMatchedMapper } from '../../../mappers/HikersMatchedMapper';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { ILocationRepository } from '../../../repositories/ILocationRepository';
import { IRideBookingRepository } from '../../../repositories/IRideBooking';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { IGetHikerMatchedUseCase } from './IGetHikersMatched';

export class GetHikersMatchedUseCase implements IGetHikerMatchedUseCase {
  constructor(
    private readonly rideRepository: IRideRepository,
    private readonly ridebookingRepository: IRideBookingRepository,
    private readonly hikeRepository: IHikeRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(
    data: GetHikersMatchedReqDTO
  ): Promise<GetHikersMatchedResponseDTO[]> {
    const ride = await this.rideRepository.findById(data.rideId);
    if (!ride) throw new RideNotFound();

    if (ride.getRiderId() !== data.userId) throw new Unauthorized();

    const rideBookings = await this.ridebookingRepository.findByRideId(
      data.rideId
    );

    const response = [];

    for (const booking of rideBookings) {
      const [hike, user] = await Promise.all([
        this.hikeRepository.findById(booking.getHikeId()),
        this.userRepository.findById(booking.getHikerId()),
      ]);
      if (hike && user) {
        const dto = hikersMatchedMapper(user, hike, booking);
        response.push(dto);
      }
    }

    return response;
  }
}
