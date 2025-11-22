import { RefundServiceResDTO } from '../../domain/dto/RideBookingDTO';
import { RideBooking } from '../../domain/entities/RideBooking';
import { RideLocationNotFound } from '../../domain/errors/RideErrors';
import { IGoogleApi } from '../providers/IGoogleApi';
import { ILocationRepository } from '../repositories/ILocationRepository';
import { IRefundService } from './IRefundService';

export class RefundService implements IRefundService {
  private readonly THRESHOLD_DISTANCE_KM = 5;
  private readonly THRESHOLD_DELAY_MIN = 10;

  constructor(
    private readonly locationRepository: ILocationRepository,
    private readonly googleApi: IGoogleApi
  ) {}

  async execute(booking: RideBooking): Promise<RefundServiceResDTO> {
    const riderInitial = this.toLatLng(booking.getRiderInitialLocation());
    const pickup = this.toLatLng(booking.getPickupLocation());

    //  Check Punctuality

    const estimation = await this.googleApi.getDistance(riderInitial, pickup);

    const minutesSinceBooking = this.getMinutesSince(booking.getCreatedAt());
    const riderDelayMin = minutesSinceBooking - estimation.duration;

    const isWithinAllowedDelay = riderDelayMin <= this.THRESHOLD_DELAY_MIN;

    //  Check Rider Current Distance

    const currentRiderLocation = await this.locationRepository.getLocation(
      booking.getRideId()
    );

    if (!currentRiderLocation) {
      throw new RideLocationNotFound();
    }

    const riderCurrent = {
      lat: currentRiderLocation.lat,
      lng: currentRiderLocation.lng,
    };

    const currentDistanceResult = await this.googleApi.getDistance(
      riderCurrent,
      pickup
    );

    // Refund Logic
    // -----------------------------
    if (!isWithinAllowedDelay) {
      return {
        refundAmount: booking.getAmount(),
        duration: currentDistanceResult.duration,
        distance: currentDistanceResult.distance,
        isRiderDelay: !isWithinAllowedDelay,
      };
    }

    const isFarFromPickup =
      currentDistanceResult.distance >= this.THRESHOLD_DISTANCE_KM;

    const qualifiesFor50PercentRefund = isFarFromPickup;

    const refundPercent = qualifiesFor50PercentRefund ? 0.5 : 0;
    const refundAmount = booking.getAmount() * refundPercent;

    return {
      refundAmount,
      duration: currentDistanceResult.duration,
      distance: currentDistanceResult.distance,
      isRiderDelay: !isWithinAllowedDelay,
    };
  }

  private toLatLng(point: GeoJSON.Point) {
    return {
      lat: point.coordinates[1],
      lng: point.coordinates[0],
    };
  }

  private getMinutesSince(date: Date) {
    const diffMs = Math.abs(new Date().getTime() - date.getTime());
    return diffMs / 60000;
  }
}
