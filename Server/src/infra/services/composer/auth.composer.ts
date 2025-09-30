import { IEmailTransporter } from '../../../application/providers/IEmailTransporter';
import { PasswordHasher } from '../../../application/providers/IpasswordHasher';
import { IOTPRepository } from '../../../application/repositories/IOTPRepository';
import { UserRepository } from '../../../application/repositories/UserRepository';
import { LoginUserUsecase } from '../../../application/usecases/LoginUserCase';
import { RegisterUserUseCase } from '../../../application/usecases/RegisterUserUseCase';
import { ResetPasswordUseCase } from '../../../application/usecases/ResetPasswordUseCase';
import { SendSignupOTPUseCase } from '../../../application/usecases/SendOTPSignupUseCase';
import { SendResetOTPUseCase } from '../../../application/usecases/SendResetOTPUseCase';
import { VerifyOTPUseCase } from '../../../application/usecases/VerifyOTPUseCase';
import { AuthController } from '../../../interfaces/http/controllers/auth.controller';
import { IauthController } from '../../../interfaces/http/controllers/IAuthcontroller';
import { NodemailerTransporter } from '../../providers/emailTransporter';
import { BcryptService } from '../../providers/passwordHasher';
import { TokenGenerator } from '../../providers/tokenGenrator';
import { RedisOTPRepository } from '../../repositories/RedisOTP.repository';
import { MongoUserRepository } from '../../repositories/UserRepository';
import { env } from '../../utils/env';

export function authComposer(): IauthController {
  ///////////////REGISTER USE CASE/////////////////////////////
  const userRepository: UserRepository = new MongoUserRepository();
  const passwordHasher: PasswordHasher = new BcryptService();
  const registerUseCase: RegisterUserUseCase = new RegisterUserUseCase(
    userRepository,
    passwordHasher
  );

  /////////////////LOGIN USE CASE////////////////////////////
  const tokenGenerator = new TokenGenerator(env.JWT_SECERT);
  const loginUseCase: LoginUserUsecase = new LoginUserUsecase(
    userRepository,
    passwordHasher,
    tokenGenerator
  );

  //////////////OTP USE CASE/////////////////
  const otpRepository: IOTPRepository = new RedisOTPRepository();
  const emailTransporter: IEmailTransporter = new NodemailerTransporter();

  const sentSignupOtpUseCase: SendSignupOTPUseCase = new SendSignupOTPUseCase(
    emailTransporter,
    otpRepository,
    userRepository
  );

  const sentResetOtpUseCase: SendResetOTPUseCase = new SendResetOTPUseCase(
    emailTransporter,
    otpRepository,
    userRepository
  );

  const verifyOtpUseCase: VerifyOTPUseCase = new VerifyOTPUseCase(
    otpRepository,
    tokenGenerator
  );

  //////////////////RESET PASSWORD///////////////////
  const resetPasswordUsecase: ResetPasswordUseCase = new ResetPasswordUseCase(
    userRepository,
    passwordHasher
  );
  /////////AUTH CONTROLLER////////////////////////
  const controller: IauthController = new AuthController(
    registerUseCase,
    loginUseCase,
    sentSignupOtpUseCase,
    sentResetOtpUseCase,
    verifyOtpUseCase,
    resetPasswordUsecase
  );
  return controller;
}
