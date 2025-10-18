import { CreateHikeUseCase } from '../../../../application/usecases/User/Hike/CreateHikeUseCase';
import { HikeController } from '../../../../interfaces/http/controllers/hike.controller';
import { IHikeController } from '../../../../interfaces/http/controllers/IHikeController';
import { GoogleApiService } from '../../../providers/GoogleApi';
import { HikeRepository } from '../../../repositories/HikeRepository';
import { MongoUserRepository } from '../../../repositories/UserRepository';

export function hikeComposer(): IHikeController {
  const userRepository = new MongoUserRepository();
  const hikeRepository = new HikeRepository();
  const googleapis = new GoogleApiService();
  const createHikeUseCase = new CreateHikeUseCase(
    hikeRepository,
    userRepository,
    googleapis
  );

  return new HikeController(createHikeUseCase);
}
