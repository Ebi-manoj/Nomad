import {
  RideBookingRequestDTO,
  RideBookingResponseDTO,
} from '../../../../domain/dto/RideBookingDTO';
import { Forbidden } from '../../../../domain/errors/CustomError';
import { HikeNotFound } from '../../../../domain/errors/HikeErrors';
import { RideBookingNotFound } from '../../../../domain/errors/RideBookingError';
import {
  RideLocationNotFound,
  RideNotFound,
} from '../../../../domain/errors/RideErrors';
import { RideBookingMapper } from '../../../mappers/RideBookingMapper';
import { IGoogleApi } from '../../../providers/IGoogleApi';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { ILocationRepository } from '../../../repositories/ILocationRepository';
import { IRideBookingRepository } from '../../../repositories/IRideBooking';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { ISubscriptionService } from '../../../services/ISubscriptionService';
import { IGetRideBookingUseCase } from './IGetRideBookingUseCase';

export class GetRideBookingUseCase implements IGetRideBookingUseCase {
  constructor(
    private readonly _bookingRepository: IRideBookingRepository,
    private readonly _rideRepository: IRideRepository,
    private readonly _hikeRepository: IHikeRepository,
    private readonly _userRepository: IUserRepository,
    private readonly _googleApi: IGoogleApi,
    private readonly _locationRepository: ILocationRepository,
    private readonly _subscriptionService: ISubscriptionService
  ) {}

  async execute(data: RideBookingRequestDTO): Promise<RideBookingResponseDTO> {
    const booking = await this._bookingRepository.findById(data.bookingId);
    if (!booking) throw new RideBookingNotFound();
    if (booking.getHikerId() !== data.userId) throw new Forbidden();

    const hike = await this._hikeRepository.findById(booking.getHikeId());
    if (!hike) throw new HikeNotFound();

    const rider = await this._userRepository.findById(booking.getRiderId());
    const ride = await this._rideRepository.findById(booking.getRideId());
    if (!rider || !ride) throw new RideNotFound();

    const riderLocation = await this._locationRepository.getLocation(
      ride.getRideId()!
    );
    if (!riderLocation) throw new RideLocationNotFound();

    const riderLocationCoord = {
      lat: riderLocation.lat,
      lng: riderLocation.lng,
    };
    const hikerPickupCoord = {
      lat: booking.getPickupLocation().coordinates[1],
      lng: booking.getPickupLocation().coordinates[0],
    };
    const hikerDestinationCoord = {
      lat: booking.getDropoffLocation().coordinates[1],
      lng: booking.getDropoffLocation().coordinates[0],
    };

    const { distance: _, duration: departure } =
      await this._googleApi.getDistance(riderLocationCoord, hikerPickupCoord);
    const { distance, duration } = await this._googleApi.getDistance(
      hikerPickupCoord,
      hikerDestinationCoord
    );
    const sub = await this._subscriptionService.getActiveSubscription(
      rider.getId()!
    );

    return {
      rideBooking: RideBookingMapper(booking),
      rider: {
        name: rider.getFullName(),
        rating: rider.getRating(),
        subscriptionTier: sub.tier,
        badgeColor: sub.subscription.getBadgeColor(),
        vehicleNumber: ride.getVehicleNumber(),
        vehicleModel: ride.getVehicleModel(),
        profilePic: rider.getProfilePic() ?? '',
        currentLocation: riderLocationCoord,
      },
      rideDetails: {
        pickupAddress: hike.getPickupAddress(),
        dropoffAddress: hike.getDestinationAddress(),
        departure: Number(departure.toFixed(2)),
        distance: Number(distance.toFixed(2)),
        duration: Number(duration.toFixed(2)),
      },
    };
  }
}
