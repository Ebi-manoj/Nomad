import { UpdateLocationUseCase } from '../../../../application/usecases/User/Ride/UpdateLocationUseCase';
import { IRiderLocationController } from '../../../../interfaces/sockets/controllers/IRiderLocationController';
import { RiderLocationController } from '../../../../interfaces/sockets/controllers/RiderLocation.controller';
import { LocationRepository } from '../../../repositories/LocationRepository';
import { SocketServer } from '../../../../interfaces/sockets/socketInit';
import { SocketRealtimeGateway } from '../../../providers/SocketRealtimeGateway';

export function locationUpdateComposer(): IRiderLocationController {
  const locationRepository = new LocationRepository();
  const updateLocationUseCase = new UpdateLocationUseCase(locationRepository);
  const io = SocketServer.getIo();
  const realtimeGateway = new SocketRealtimeGateway(io);
  const riderLocationController = new RiderLocationController(
    updateLocationUseCase,
    realtimeGateway
  );

  return riderLocationController;
}
