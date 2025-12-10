import { Position } from 'geojson';
import { UpdateLocationDTO } from '../../../../domain/dto/RideDTO';
import { Location } from '../../../../domain/entities/Location';
import { IGeoService } from '../../../providers/IGeoService';
import { ILocationRepository } from '../../../repositories/ILocationRepository';
import { IUpdateLocationUseCase } from './IUpdateLocationUseCase';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { RideNotFound } from '../../../../domain/errors/RideErrors';
import { IRealtimeGateway } from '../../../providers/IRealtimeGateway';

export class UpdateLocationUseCase implements IUpdateLocationUseCase {
  constructor(
    private readonly locationRepository: ILocationRepository,
    private readonly rideRepository: IRideRepository,
    private readonly geoService: IGeoService,
    private readonly realtimeGateway: IRealtimeGateway
  ) {}

  async execute(data: UpdateLocationDTO) {
    const location = new Location(data);
    await this.locationRepository.saveLocation(location);
    data.lat = 9.97;
    data.lng = 76.32;
    const deviation = await this.calculateDeviation(data);
    console.log(deviation);
    if (deviation > 2) {
      console.log('Devaited true');
      this.realtimeGateway.emitToRoom('rider', data.rideId, 'ride:deviated', {
        message: 'Ride deviated',
      });
    }
  }

  private async calculateDeviation(data: UpdateLocationDTO): Promise<number> {
    const currentLocation: Position = [data.lng, data.lat];
    const point = this.geoService.createPoint(currentLocation);
    const rideLog = await this.rideRepository.findById(data.rideId);
    if (!rideLog) throw new RideNotFound();
    const routeLine = this.geoService.createLine(
      rideLog.getRoute().coordinates
    );
    const deviation = this.geoService.pointToLineDistance(point, routeLine);

    return deviation;
  }
}
