import {
  GetRideDetailsReqDTO,
  GetRideDetailsResDTO,
  HikerMatchedDTO,
} from '../../../../domain/dto/RideDTO';
import { Forbidden } from '../../../../domain/errors/CustomError';
import { RideNotFound } from '../../../../domain/errors/RideErrors';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { IRideBookingRepository } from '../../../repositories/IRideBooking';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { IGetRideDetailsUseCase } from './IGetRideDetailsUseCase';

export class GetRideDetailsUseCase implements IGetRideDetailsUseCase {
  constructor(
    private readonly rideRepository: IRideRepository,
    private readonly bookingRepository: IRideBookingRepository,
    private readonly userRepository: IUserRepository,
    private readonly hikeRepository: IHikeRepository
  ) {}

  async execute(data: GetRideDetailsReqDTO): Promise<GetRideDetailsResDTO> {
    const ride = await this.rideRepository.findById(data.rideId);
    if (!ride) throw new RideNotFound();

    if (ride.getRiderId() !== data.userId) throw new Forbidden();

    const totalCostShared =
      await this.bookingRepository.getTotalCostShareOfRide(data.rideId);

    const bookings = await this.bookingRepository.findByRideId(data.rideId);

    const hikersMatched = await Promise.all(
      bookings.map(async b => {
        const hiker = await this.userRepository.findById(b.getHikerId());
        const hike = await this.hikeRepository.findById(b.getHikeId());
        if (!hiker || !hike) return null;
        const response: HikerMatchedDTO = {
          bookingId: b.getId()!,
          hikeId: b.getHikeId(),
          pickupAddress: hike.getPickupAddress(),
          destinationAddress: hike.getDestinationAddress(),
          amount: b.getAmount(),
          status: b.getStatus(),
          seatsBooked: b.getSeatsBooked(),
          createdAt: b.getCreatedAt(),
          completedAt: b.getCompletedAt(),
          hiker: {
            userId: hiker.getId()!,
            fullName: hiker.getFullName(),
            profilePic: '',
            rating: 4.5,
            verified: hiker.getIsVerifed(),
          },
        };

        return response;
      })
    );

    return {
      rideId: ride.getRideId()!,
      userId: ride.getRiderId(),
      startAddress: ride.getPickupAddress(),
      endAddress: ride.getDestinationAddress(),
      totalDistance: ride.getTotalDistance(),
      vehicleType: ride.getVehicleType(),
      vehicleModel: ride.getVehicleModel(),
      vehicleNumber: ride.getVehicleNumber(),
      hasHelmet: ride.getHasHelmet(),
      costSharing: ride.getCostSharing(),
      status: ride.getStatus(),
      createdAt: ride.getCreatedAt(),
      completedAt: ride.getCreatedAt(),
      totalCostShared,
      hikersMatched: hikersMatched.filter(Boolean) as HikerMatchedDTO[],
    };
  }
}
