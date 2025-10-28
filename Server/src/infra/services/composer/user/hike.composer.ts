import { CreateHikeUseCase } from '../../../../application/usecases/User/Hike/CreateHikeUseCase';
import { FindMatchRideUseCase } from '../../../../application/usecases/User/Hike/findMatchRidesUseCase';
import { HikeController } from '../../../../interfaces/http/controllers/hike.controller';
import { IHikeController } from '../../../../interfaces/http/controllers/IHikeController';
import { GoogleApiService } from '../../../providers/GoogleApi';
import { HikeRepository } from '../../../repositories/HikeRepository';
import { RideRepository } from '../../../repositories/RideRepository';
import { MongoUserRepository } from '../../../repositories/UserRepository';

export function hikeComposer(): IHikeController {
  const userRepository = new MongoUserRepository();
  const hikeRepository = new HikeRepository();
  const rideRepository = new RideRepository();
  const googleapis = new GoogleApiService();

  const createHikeUseCase = new CreateHikeUseCase(
    hikeRepository,
    userRepository,
    googleapis
  );

  const findMatchRidesUseCase = new FindMatchRideUseCase(rideRepository);

  return new HikeController(createHikeUseCase, findMatchRidesUseCase);
}
