import {
  GetRideDetailsReqDTO,
  GetRideDetailsResDTO,
  HikerMatchedDTO,
} from '../../../../domain/dto/RideDTO';
import { Forbidden } from '../../../../domain/errors/CustomError';
import { RideNotFound } from '../../../../domain/errors/RideErrors';
import { ReviewMapper } from '../../../mappers/ReviewMapper';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { IReviewRepository } from '../../../repositories/IReviewRepository';
import { IRideBookingRepository } from '../../../repositories/IRideBooking';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { ISubscriptionService } from '../../../services/ISubscriptionService';
import { IGetRideDetailsUseCase } from './IGetRideDetailsUseCase';

export class GetRideDetailsUseCase implements IGetRideDetailsUseCase {
  constructor(
    private readonly _rideRepository: IRideRepository,
    private readonly _bookingRepository: IRideBookingRepository,
    private readonly _userRepository: IUserRepository,
    private readonly _hikeRepository: IHikeRepository,
    private readonly _reviewRepository: IReviewRepository,
    private readonly _subscriptionService: ISubscriptionService
  ) {}

  async execute(data: GetRideDetailsReqDTO): Promise<GetRideDetailsResDTO> {
    const ride = await this._rideRepository.findById(data.rideId);
    if (!ride) throw new RideNotFound();

    if (ride.getRiderId() !== data.userId) throw new Forbidden();

    const totalEarning = ride.getTotalEarning();
    const platformFeeTotal = ride.getPlatformFeeTotal();

    const bookings = await this._bookingRepository.findByRideId(data.rideId);

    const hikersMatched = await Promise.all(
      bookings.map(async b => {
        const [hiker, hike, review] = await Promise.all([
          this._userRepository.findById(b.getHikerId()),
          this._hikeRepository.findById(b.getHikeId()),
          this._reviewRepository.findByReviewerAndBooking(
            data.userId,
            b.getId()!
          ),
        ]);
        if (!hiker || !hike) return null;
        const sub = await this._subscriptionService.getActiveSubscription(
          hiker.getId()!
        );
        const response: HikerMatchedDTO = {
          bookingId: b.getId()!,
          hikeId: b.getHikeId(),
          pickupAddress: hike.getPickupAddress(),
          destinationAddress: hike.getDestinationAddress(),
          amount: b.getCostShared(),
          totalDistance: b.getTotalDistance(),
          platformFee: b.getPlatformFee(),
          status: b.getStatus(),
          seatsBooked: b.getSeatsBooked(),
          createdAt: b.getCreatedAt(),
          completedAt: b.getCompletedAt(),
          refundAmount: b.getRefundedAmount(),
          cancelledAt: b.getCancelledAt(),
          hiker: {
            userId: hiker.getId()!,
            fullName: hiker.getFullName(),
            profilePic: '',
            rating: 4.5,
            verified: hiker.getIsVerifed(),
            subscriptionTier: sub.tier,
          },
          review: review ? ReviewMapper(review) : null,
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
      completedAt: ride.getCompletedAt(),
      totalCostShared: totalEarning,
      platformFee: platformFeeTotal,
      hikersMatched: hikersMatched.filter(Boolean) as HikerMatchedDTO[],
    };
  }
}
