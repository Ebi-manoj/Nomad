import { Position } from 'geojson';
import { UpdateLocationDTO } from '../../../../domain/dto/RideDTO';
import { Location } from '../../../../domain/entities/Location';
import { IGeoService } from '../../../providers/IGeoService';
import { ILocationRepository } from '../../../repositories/ILocationRepository';
import { IUpdateLocationUseCase } from './IUpdateLocationUseCase';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { RideNotFound } from '../../../../domain/errors/RideErrors';
import { IRealtimeGateway } from '../../../providers/IRealtimeGateway';
import { ICreateDeviationLogUseCase } from '../Sos/ICreateDeviationLog';

export class UpdateLocationUseCase implements IUpdateLocationUseCase {
  constructor(
    private readonly _locationRepository: ILocationRepository,
    private readonly _rideRepository: IRideRepository,
    private readonly _geoService: IGeoService,
    private readonly _realtimeGateway: IRealtimeGateway,
    private readonly _createDeviationUseCase: ICreateDeviationLogUseCase
  ) {}

  async execute(data: UpdateLocationDTO) {
    const location = new Location(data);
    await this._locationRepository.saveLocation(location);
    // data.lat = 9.97;
    // data.lng = 76.24;
    const deviation = await this.calculateDeviation(data);
    if (deviation > 2) {
      this._realtimeGateway.emitToRoom('rider', data.rideId, 'ride:deviated', {
        message: 'Ride deviated',
      });
      this._createDeviationUseCase.execute({
        rideId: data.rideId,
        location: { lat: data.lat, lng: data.lng },
        deviationDistance: deviation,
      });
    }
  }

  private async calculateDeviation(data: UpdateLocationDTO): Promise<number> {
    const currentLocation: Position = [data.lng, data.lat];
    const point = this._geoService.createPoint(currentLocation);
    const rideLog = await this._rideRepository.findById(data.rideId);
    if (!rideLog) throw new RideNotFound();
    const routeLine = this._geoService.createLine(
      rideLog.getRoute().coordinates
    );
    const deviation = this._geoService.pointToLineDistance(point, routeLine);

    return deviation;
  }
}
