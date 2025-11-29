import { GetAllHikeUseCase } from '../../../../application/usecases/Admin/GetAllHikeUseCase';
import { AdminHikeController } from '../../../../interfaces/http/controllers/adminHike.controller';
import { IAdminHikeController } from '../../../../interfaces/http/controllers/IAdminHikeController';
import { HikeRepository } from '../../../repositories/HikeRepository';
import { MongoUserRepository } from '../../../repositories/UserRepository';

export function hikeAdminComposer(): IAdminHikeController {
  const hikeRepository = new HikeRepository();
  const userRepository = new MongoUserRepository();
  const getAllHikeUseCase = new GetAllHikeUseCase(
    hikeRepository,
    userRepository
  );

  return new AdminHikeController(getAllHikeUseCase);
}
