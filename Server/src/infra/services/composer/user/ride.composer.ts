import { CreateRideUseCase } from '../../../../application/usecases/User/Ride/CreateRideUseCase';
import { IRideController } from '../../../../interfaces/http/controllers/IRideController';
import { RideController } from '../../../../interfaces/http/controllers/ride.controller';
import { GoogleApiService } from '../../../providers/GoogleApi';
import { RideRepository } from '../../../repositories/RideRepository';
import { MongoUserRepository } from '../../../repositories/UserRepository';

export function rideComposer(): IRideController {
  const userRepository = new MongoUserRepository();
  const googleApis = new GoogleApiService();
  const rideRepository = new RideRepository();
  const createRideUseCase = new CreateRideUseCase(
    userRepository,
    googleApis,
    rideRepository
  );

  return new RideController(createRideUseCase);
}
