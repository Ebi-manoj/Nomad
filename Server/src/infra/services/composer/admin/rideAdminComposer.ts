import { GetAllRideUseCase } from '../../../../application/usecases/Admin/GetAllRideUseCase';
import { AdminRideController } from '../../../../interfaces/http/controllers/adminRide.controller';
import { IAdminRideController } from '../../../../interfaces/http/controllers/IAdminRideController';
import { RideRepository } from '../../../repositories/RideRepository';

export function rideAdminComposer(): IAdminRideController {
  const rideRepository = new RideRepository();
  const getAllRideUseCase = new GetAllRideUseCase(rideRepository);

  return new AdminRideController(getAllRideUseCase);
}
