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
import { IGetRideBookingUseCase } from './IGetRideBookingUseCase';

export class GetRideBookingUseCase implements IGetRideBookingUseCase {
  constructor(
    private readonly bookingRepository: IRideBookingRepository,
    private readonly rideRepository: IRideRepository,
    private readonly hikeRepository: IHikeRepository,
    private readonly userRepository: IUserRepository,
    private readonly googleApi: IGoogleApi,
    private readonly locationRepository: ILocationRepository
  ) {}

  async execute(data: RideBookingRequestDTO): Promise<RideBookingResponseDTO> {
    const booking = await this.bookingRepository.findById(data.bookingId);
    if (!booking) throw new RideBookingNotFound();
    if (booking.getHikerId() !== data.userId) throw new Forbidden();

    const hike = await this.hikeRepository.findById(booking.getHikeId());
    if (!hike) throw new HikeNotFound();

    const rider = await this.userRepository.findById(booking.getRiderId());
    const ride = await this.rideRepository.findById(booking.getRideId());
    if (!rider || !ride) throw new RideNotFound();

    const riderLocation = await this.locationRepository.getLocation(
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
      await this.googleApi.getDistance(riderLocationCoord, hikerPickupCoord);
    const { distance, duration } = await this.googleApi.getDistance(
      hikerPickupCoord,
      hikerDestinationCoord
    );

    return {
      rideBooking: RideBookingMapper(booking),
      rider: {
        name: rider.getFullName(),
        rating: 4.5,
        vehicleNumber: ride.getVehicleNumber(),
        vehicleModel: ride.getVehicleModel(),
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
