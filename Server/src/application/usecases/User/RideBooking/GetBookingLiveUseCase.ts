import {
  BookingLiveReqDTO,
  BookingLiveResDTO,
} from '../../../../domain/dto/RideBookingDTO';
import { Forbidden } from '../../../../domain/errors/CustomError';
import {
  FailToFetchLiveUpdates,
  RideBookingNotFound,
} from '../../../../domain/errors/RideBookingError';
import { IGoogleApi } from '../../../providers/IGoogleApi';
import { ILocationRepository } from '../../../repositories/ILocationRepository';
import { IRideBookingRepository } from '../../../repositories/IRideBooking';
import { IGetBookingLiveUseCase } from './IGetBookingLive';

export class GetBookingLiveUseCase implements IGetBookingLiveUseCase {
  constructor(
    private readonly bookingRepository: IRideBookingRepository,
    private readonly locationRepository: ILocationRepository,
    private readonly googleApi: IGoogleApi
  ) {}

  async execute(data: BookingLiveReqDTO): Promise<BookingLiveResDTO> {
    const booking = await this.bookingRepository.findById(data.bookingId);
    if (!booking) throw new RideBookingNotFound();

    if (booking.getHikerId() !== data.userId) throw new Forbidden();

    const riderLocation = await this.locationRepository.getLocation(
      booking.getRideId()
    );
    if (!riderLocation) throw new FailToFetchLiveUpdates();

    const riderLocationCoord = {
      lat: riderLocation.lat,
      lng: riderLocation.lng,
    };
    const hikerPickupCoord = {
      lat: booking.getPickupLocation().coordinates[1],
      lng: booking.getPickupLocation().coordinates[0],
    };

    const { distance, duration } = await this.googleApi.getDistance(
      riderLocationCoord,
      hikerPickupCoord
    );

    return {
      currentLocation: riderLocation,
      departure: duration,
      status: booking.getStatus(),
    };
  }
}
