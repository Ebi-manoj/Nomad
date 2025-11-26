import { GetSosLogsUseCase } from '../../../../application/usecases/Admin/GetSosLogsUseCase';
import type { IAdminSosController } from '../../../../interfaces/http/controllers/IAdminSosController';
import { AdminSosController } from '../../../../interfaces/http/controllers/adminSos.controller';
import { SosLogRepository } from '../../../repositories/SosLogRepository';
import { MongoUserRepository } from '../../../repositories/UserRepository';

export function sosAdminComposer(): IAdminSosController {
  const sosLogRepository = new SosLogRepository();
  const userRepository = new MongoUserRepository();
  const getSosLogsUseCase = new GetSosLogsUseCase(
    sosLogRepository,
    userRepository
  );

  return new AdminSosController(getSosLogsUseCase);
}
