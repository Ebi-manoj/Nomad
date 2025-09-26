import { PasswordHasher } from '../../../application/providers/IpasswordHasher';
import { UserRepository } from '../../../application/repositories/UserRepository';
import { RegisterUserUseCase } from '../../../application/usecases/RegisterUserUseCase';
import { AuthController } from '../../../interfaces/http/controllers/auth.controller';
import { IauthController } from '../../../interfaces/http/controllers/Icontroller';
import { BcryptService } from '../../providers/passwordHasher';
import { MongoUserRepository } from '../../repositories/UserRepository';

export function authComposer(): IauthController {
  const userRepository: UserRepository = new MongoUserRepository();
  const passwordHasher: PasswordHasher = new BcryptService();
  const useCase: RegisterUserUseCase = new RegisterUserUseCase(
    userRepository,
    passwordHasher
  );

  const controller: IauthController = new AuthController(useCase);
  return controller;
}
