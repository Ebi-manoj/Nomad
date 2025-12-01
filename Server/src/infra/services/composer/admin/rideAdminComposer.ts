import { AdminRideDetailsUseCase } from '../../../../application/usecases/Admin/AdminRideDetailsUseCase';
import { GetAllRideUseCase } from '../../../../application/usecases/Admin/GetAllRideUseCase';
import { AdminRideController } from '../../../../interfaces/http/controllers/adminRide.controller';
import { IAdminRideController } from '../../../../interfaces/http/controllers/IAdminRideController';
import { HikeRepository } from '../../../repositories/HikeRepository';
import { RideBookingRepository } from '../../../repositories/RideBookingRepository';
import { RideRepository } from '../../../repositories/RideRepository';
import { MongoUserRepository } from '../../../repositories/UserRepository';

export function rideAdminComposer(): IAdminRideController {
  const rideRepository = new RideRepository();
  const userRepository = new MongoUserRepository();
  const hikeRepository = new HikeRepository();
  const bookingRepository = new RideBookingRepository();
  const getAllRideUseCase = new GetAllRideUseCase(
    rideRepository,
    userRepository
  );

  const getRideDetailsUseCase = new AdminRideDetailsUseCase(
    rideRepository,
    bookingRepository,
    userRepository,
    hikeRepository
  );

  return new AdminRideController(getAllRideUseCase, getRideDetailsUseCase);
}
