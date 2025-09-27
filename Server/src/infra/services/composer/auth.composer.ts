import { PasswordHasher } from '../../../application/providers/IpasswordHasher';
import { UserRepository } from '../../../application/repositories/UserRepository';
import { LoginUserUsecase } from '../../../application/usecases/LoginUserCase';
import { RegisterUserUseCase } from '../../../application/usecases/RegisterUserUseCase';
import { AuthController } from '../../../interfaces/http/controllers/auth.controller';
import { IauthController } from '../../../interfaces/http/controllers/Icontroller';
import { BcryptService } from '../../providers/passwordHasher';
import { TokenGenerator } from '../../providers/tokenGenrator';
import { MongoUserRepository } from '../../repositories/UserRepository';
import { env } from '../../utils/env';

export function authComposer(): IauthController {
  const userRepository: UserRepository = new MongoUserRepository();
  const passwordHasher: PasswordHasher = new BcryptService();
  const registerUseCase: RegisterUserUseCase = new RegisterUserUseCase(
    userRepository,
    passwordHasher
  );
  const tokenGenerator = new TokenGenerator(env.JWT_SECERT);

  const loginUseCase: LoginUserUsecase = new LoginUserUsecase(
    userRepository,
    passwordHasher,
    tokenGenerator
  );

  const controller: IauthController = new AuthController(
    registerUseCase,
    loginUseCase
  );
  return controller;
}
