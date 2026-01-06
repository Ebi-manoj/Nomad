import { IUserProfileController } from '../../../../interfaces/http/controllers/IUserProfileController';
import { UserProfileController } from '../../../../interfaces/http/controllers/userProfile.controller';
import { GetUserProfileUseCase } from '../../../../application/usecases/User/Profile/GetUserProfileUseCase';
import { UpdateUserProfileUseCase } from '../../../../application/usecases/User/Profile/UpdateUserProfileUseCase';
import { UpdateUserProfileImageUseCase } from '../../../../application/usecases/User/Profile/UpdateUserProfileImageUseCase';
import { MongoUserRepository } from '../../../repositories/UserRepository';
import { RideRepository } from '../../../repositories/RideRepository';
import { HikeRepository } from '../../../repositories/HikeRepository';

export function profileComposer(): IUserProfileController {
  const userRepo = new MongoUserRepository();
  const rideRepo = new RideRepository();
  const hikeRepo = new HikeRepository();
  const getUseCase = new GetUserProfileUseCase(userRepo, rideRepo, hikeRepo);
  const updateUseCase = new UpdateUserProfileUseCase(userRepo);
  const updateImageUseCase = new UpdateUserProfileImageUseCase(userRepo);
  return new UserProfileController(getUseCase, updateUseCase, updateImageUseCase);
}
