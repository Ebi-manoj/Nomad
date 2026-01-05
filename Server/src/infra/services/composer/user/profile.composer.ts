import { IUserProfileController } from '../../../../interfaces/http/controllers/IUserProfileController';
import { UserProfileController } from '../../../../interfaces/http/controllers/userProfile.controller';
import { GetUserProfileUseCase } from '../../../../application/usecases/User/Profile/GetUserProfileUseCase';
import { MongoUserRepository } from '../../../repositories/UserRepository';
import { RideRepository } from '../../../repositories/RideRepository';
import { HikeRepository } from '../../../repositories/HikeRepository';

export function profileComposer(): IUserProfileController {
  const userRepo = new MongoUserRepository();
  const rideRepo = new RideRepository();
  const hikeRepo = new HikeRepository();
  const useCase = new GetUserProfileUseCase(userRepo, rideRepo, hikeRepo);
  return new UserProfileController(useCase);
}
