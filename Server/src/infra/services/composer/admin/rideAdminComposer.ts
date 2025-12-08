import { AdminRideDetailsUseCase } from '../../../../application/usecases/Admin/AdminRideDetailsUseCase';
import { GetAllRideUseCase } from '../../../../application/usecases/Admin/GetAllRideUseCase';
import { AdminRideController } from '../../../../interfaces/http/controllers/adminRide.controller';
import { IAdminRideController } from '../../../../interfaces/http/controllers/IAdminRideController';
import { HikeRepository } from '../../../repositories/HikeRepository';
import { ReviewRepository } from '../../../repositories/ReviewRepository';
import { RideBookingRepository } from '../../../repositories/RideBookingRepository';
import { RideRepository } from '../../../repositories/RideRepository';
import { MongoUserRepository } from '../../../repositories/UserRepository';
import { SubscriptionRepository } from '../../../repositories/SubscriptionRepository';
import { SubscriptionService } from '../../../../application/services/SubscriptionService';

export function rideAdminComposer(): IAdminRideController {
  const rideRepository = new RideRepository();
  const userRepository = new MongoUserRepository();
  const hikeRepository = new HikeRepository();
  const bookingRepository = new RideBookingRepository();
  const subscriptionRepository = new SubscriptionRepository();
  const subscriptionService = new SubscriptionService(subscriptionRepository);
  const getAllRideUseCase = new GetAllRideUseCase(
    rideRepository,
    userRepository
  );
  const reveiewRepository=new ReviewRepository()

  const getRideDetailsUseCase = new AdminRideDetailsUseCase(
    rideRepository,
    bookingRepository,
    userRepository,
    hikeRepository,
    reveiewRepository,
    subscriptionService
  );

  return new AdminRideController(getAllRideUseCase, getRideDetailsUseCase);
}
