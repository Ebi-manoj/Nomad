import { BlockUserUseCase } from '../../../../application/usecases/Admin/BlockUserUseCase';
import { GetAllUsersUseCase } from '../../../../application/usecases/Admin/GetAllUsersUseCase';
import { IUserManagementController } from '../../../../interfaces/http/controllers/IUserManagementController';
import { userManagementController } from '../../../../interfaces/http/controllers/userManagement.controller';
import { MongoUserRepository } from '../../../repositories/UserRepository';

export function userManagementComposer(): IUserManagementController {
  const userRepository = new MongoUserRepository();
  const getAllUserUseCase = new GetAllUsersUseCase(userRepository);
  const blockUserUseCase = new BlockUserUseCase(userRepository);
  return new userManagementController(getAllUserUseCase, blockUserUseCase);
}
