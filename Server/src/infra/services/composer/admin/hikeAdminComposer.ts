import { GetAllHikeUseCase } from '../../../../application/usecases/Admin/GetAllHikeUseCase';
import { AdminHikeController } from '../../../../interfaces/http/controllers/adminHike.controller';
import { IAdminHikeController } from '../../../../interfaces/http/controllers/IAdminHikeController';
import { HikeRepository } from '../../../repositories/HikeRepository';

export function hikeAdminComposer(): IAdminHikeController {
  const hikeRepository = new HikeRepository();
  const getAllHikeUseCase = new GetAllHikeUseCase(hikeRepository);

  return new AdminHikeController(getAllHikeUseCase);
}
