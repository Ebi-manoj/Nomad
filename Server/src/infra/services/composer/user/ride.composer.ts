import { CreateRideUseCase } from '../../../../application/usecases/User/Ride/CreateRideUseCase';
import { GetPendingRequestUseCase } from '../../../../application/usecases/User/Ride/GetPendingRequestUseCase';
import { IRideController } from '../../../../interfaces/http/controllers/IRideController';
import { RideController } from '../../../../interfaces/http/controllers/ride.controller';
import { GoogleApiService } from '../../../providers/GoogleApi';
import { HikeRepository } from '../../../repositories/HikeRepository';
import { JoinRequestRepository } from '../../../repositories/JoinRequestReqpository';
import { RideRepository } from '../../../repositories/RideRepository';
import { MongoUserRepository } from '../../../repositories/UserRepository';

export function rideComposer(): IRideController {
  const userRepository = new MongoUserRepository();
  const googleApis = new GoogleApiService();
  const rideRepository = new RideRepository();
  const joinRequestRepository = new JoinRequestRepository();
  const hikeRepository = new HikeRepository();
  const createRideUseCase = new CreateRideUseCase(
    userRepository,
    googleApis,
    rideRepository
  );

  const getPendingRequestUseCase = new GetPendingRequestUseCase(
    joinRequestRepository,
    hikeRepository,
    userRepository
  );

  return new RideController(createRideUseCase, getPendingRequestUseCase);
}
