import { CreateDeviationReqDTO } from '../../../../domain/dto/RouteDeviationDTO';
import { RouteDeviation } from '../../../../domain/entities/RouteDeviation';
import { RideNotFound } from '../../../../domain/errors/RideErrors';
import { IRealtimeGateway } from '../../../providers/IRealtimeGateway';
import { IRideBookingRepository } from '../../../repositories/IRideBooking';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { IRouteDeviationRepository } from '../../../repositories/IRouteDeviationRepository';
import { ICreateDeviationLogUseCase } from './ICreateDeviationLog';

export class CreateDeviationLogUseCase implements ICreateDeviationLogUseCase {
  constructor(
    private readonly _bookingRepository: IRideBookingRepository,
    private readonly _routeDeviationRepository: IRouteDeviationRepository,
    private readonly _rideRepository: IRideRepository,
    private readonly _realTimeGateWay: IRealtimeGateway
  ) {}

  async execute(data: CreateDeviationReqDTO): Promise<void> {
    const ride = await this._rideRepository.findById(data.rideId);
    if (!ride) throw new RideNotFound();
    const pickedUpBookings = await this._bookingRepository.findPickedUpByRideId(
      data.rideId
    );
    if (pickedUpBookings.length < 0) return;
    const currentLocation: GeoJSON.Point = {
      type: 'Point',
      coordinates: [data.location.lat, data.location.lng],
    };

    const createdDeviations = await Promise.all(
      pickedUpBookings.map(async pb => {
        const isRecentDeviated =
          await this._routeDeviationRepository.findByHikeIdLesserThan(
            20,
            pb.getHikeId()
          );
        if (isRecentDeviated) return;

        const deviation = new RouteDeviation({
          rideId: data.rideId,
          hikerId: pb.getHikerId()!,
          hikeId: pb.getHikeId(),
          riderId: ride.getRiderId(),
          currentLocation,
          deviationDistance: data.deviationDistance,
          detectedAt: new Date(),
          acknowledged: false,
        });
        await this._routeDeviationRepository.create(deviation);
        return deviation;
      })
    );

    createdDeviations
      .filter(d => d !== undefined)
      .forEach(d => {
        this._realTimeGateWay.emitToRoom(
          'hiker',
          d.getHikeId(),
          'ride:deviated',
          {
            message: 'Rider has been deviated from the route',
            data: d.toJson(),
          }
        );
      });
  }
}
