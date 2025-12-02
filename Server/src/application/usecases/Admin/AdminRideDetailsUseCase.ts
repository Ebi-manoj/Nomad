import { AdminGetRideDetailsResDTO } from '../../../domain/dto/adminRidesDTO';
import { HikerMatchedDTO } from '../../../domain/dto/RideDTO';
import { UserNotFound } from '../../../domain/errors/CustomError';
import { RideNotFound } from '../../../domain/errors/RideErrors';
import { IHikeRepository } from '../../repositories/IHikeRepository';
import { IRideBookingRepository } from '../../repositories/IRideBooking';
import { IRideRepository } from '../../repositories/IRideRepository';
import { IUserRepository } from '../../repositories/IUserRepository';
import { userMapper } from '../../mappers/UserResponse.mapper';
import { IAdminRideDetailsUseCase } from './IAdminRideDetailsUseCase';
import { IReviewRepository } from '../../repositories/IReviewRepository';
import { ReviewMapper } from '../../mappers/ReviewMapper';

export class AdminRideDetailsUseCase implements IAdminRideDetailsUseCase {
  constructor(
    private readonly rideRepository: IRideRepository,
    private readonly bookingRepository: IRideBookingRepository,
    private readonly userRepository: IUserRepository,
    private readonly hikeRepository: IHikeRepository,
    private readonly reviewRepository:IReviewRepository
  ) {}

  async execute(rideId: string): Promise<AdminGetRideDetailsResDTO> {
    const ride = await this.rideRepository.findById(rideId);
    if (!ride) throw new RideNotFound();

    const rider = await this.userRepository.findById(ride.getRiderId());
    if (!rider) throw new UserNotFound();

    const totalEarning = ride.getTotalEarning();
    const platformFeeTotal = ride.getPlatformFeeTotal();

    const bookings = await this.bookingRepository.findByRideId(rideId);

    const hikersMatched = await Promise.all(
      bookings.map(async b => {
        const [hiker,hike,review]=await Promise.all([
          this.userRepository.findById(b.getHikerId()),
          this.hikeRepository.findById(b.getHikeId()),
          this.reviewRepository.findByReviewerAndBooking(b.getRiderId(),b.getId()!)
        ])
        if (!hiker || !hike) return null;

        const matched: HikerMatchedDTO = {
          bookingId: b.getId()!,
          hikeId: b.getHikeId(),
          pickupAddress: hike.getPickupAddress(),
          destinationAddress: hike.getDestinationAddress(),
          totalDistance: b.getTotalDistance(),
          amount: b.getCostShared(),
          platformFee: b.getPlatformFee(),
          status: b.getStatus(),
          seatsBooked: b.getSeatsBooked(),
          createdAt: b.getCreatedAt(),
          refundAmount: b.getRefundedAmount(),
          completedAt: b.getCompletedAt(),
          cancelledAt: b.getCancelledAt(),
          hiker: {
            userId: hiker.getId()!,
            fullName: hiker.getFullName(),
            profilePic: '',
            rating: 4.5,
            verified: hiker.getIsVerifed(),
          },
          review:review?ReviewMapper(review):null
        };

        return matched;
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
      completedAt: ride.getCompletedAt(),
      totalCostShared: totalEarning,
      platformFee: platformFeeTotal,
      hikersMatched: hikersMatched.filter(
        (h): h is HikerMatchedDTO => h !== null
      ),
      rider: userMapper(rider),
    };
  }
}
