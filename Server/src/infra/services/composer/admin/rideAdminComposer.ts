import { GetAllRideUseCase } from '../../../../application/usecases/Admin/GetAllRideUseCase';
import { AdminRideController } from '../../../../interfaces/http/controllers/adminRide.controller';
import { IAdminRideController } from '../../../../interfaces/http/controllers/IAdminRideController';
import { RideRepository } from '../../../repositories/RideRepository';
import { MongoUserRepository } from '../../../repositories/UserRepository';

export function rideAdminComposer(): IAdminRideController {
  const rideRepository = new RideRepository();
  const userRepository = new MongoUserRepository();
  const getAllRideUseCase = new GetAllRideUseCase(
    rideRepository,
    userRepository
  );

  return new AdminRideController(getAllRideUseCase);
}
