import { UpdateLocationUseCase } from '../../../../application/usecases/User/Ride/UpdateLocationUseCase';
import { IRiderLocationController } from '../../../../interfaces/sockets/controllers/IRiderLocationController';
import { RiderLocationController } from '../../../../interfaces/sockets/controllers/RiderLocation.controller';
import { LocationRepository } from '../../../repositories/LocationRepository';
import { SocketServer } from '../../../../interfaces/sockets/socketInit';
import { SocketRealtimeGateway } from '../../../providers/SocketRealtimeGateway';
import { RideRepository } from '../../../repositories/RideRepository';
import { TurfGeoService } from '../../../providers/turfGeroService';

export function locationUpdateComposer(): IRiderLocationController {
  const locationRepository = new LocationRepository();
  const rideRepository = new RideRepository();
  const geoService = new TurfGeoService();
  const io = SocketServer.getIo();
  const realtimeGateway = new SocketRealtimeGateway(io);

  const updateLocationUseCase = new UpdateLocationUseCase(
    locationRepository,
    rideRepository,
    geoService,
    realtimeGateway
  );

  const riderLocationController = new RiderLocationController(
    updateLocationUseCase,
    realtimeGateway
  );

  return riderLocationController;
}
