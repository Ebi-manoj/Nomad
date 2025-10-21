import { UpdateLocationUseCase } from '../../../../application/usecases/User/Ride/UpdateLocationUseCase';
import { IRiderLocationController } from '../../../../interfaces/sockets/controllers/IRiderLocationController';
import { RiderLocationController } from '../../../../interfaces/sockets/controllers/RiderLocation.controller';
import { LocationRepository } from '../../../repositories/LocationRepository';

export function locationUpdateComposer(): IRiderLocationController {
  const locationRepository = new LocationRepository();
  const updateLocationUseCase = new UpdateLocationUseCase(locationRepository);
  const riderLocationController = new RiderLocationController(
    updateLocationUseCase
  );

  return riderLocationController;
}
