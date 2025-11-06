import { IEmailTransporter } from '../../../application/providers/IEmailTransporter';
import { PasswordHasher } from '../../../application/providers/IpasswordHasher';
import { IOTPRepository } from '../../../application/repositories/IOTPRepository';
import { IUserRepository } from '../../../application/repositories/IUserRepository';
import { GoogleSignupUseCase } from '../../../application/usecases/Auth/GoogleSignupUseCase.ts';
import { LoginUserUsecase } from '../../../application/usecases/Auth/LoginUserCase';
import { RefreshTokenUseCase } from '../../../application/usecases/Auth/RefreshTokenUseCase';
import { RegisterUserUseCase } from '../../../application/usecases/Auth/RegisterUserUseCase';
import { ResetPasswordUseCase } from '../../../application/usecases/Auth/ResetPasswordUseCase';
import { SendSignupOTPUseCase } from '../../../application/usecases/Auth/SendOTPSignupUseCase';
import { SendResetOTPUseCase } from '../../../application/usecases/Auth/SendResetOTPUseCase';
import { VerifyOTPUseCase } from '../../../application/usecases/Auth/VerifyOTPUseCase';
import { AuthController } from '../../../interfaces/http/controllers/auth.controller';
import { IauthController } from '../../../interfaces/http/controllers/IAuthcontroller';
import { NodemailerTransporter } from '../../providers/emailTransporter';
import { GoogleClient } from '../../providers/googleClient';
import { BcryptService } from '../../providers/passwordHasher';
import { TokenGenerator } from '../../providers/tokenGenrator';
import { WinstonLogger } from '../../providers/winstonLogger';
import { RedisOTPRepository } from '../../repositories/RedisOTP.repository';
import { MongoUserRepository } from '../../repositories/UserRepository';
import { env } from '../../utils/env';

export function authComposer(): IauthController {
  const logger = new WinstonLogger();
  ///////////////REGISTER USE CASE/////////////////////////////
  const userRepository: IUserRepository = new MongoUserRepository();
  const passwordHasher: PasswordHasher = new BcryptService();
  const registerUseCase: RegisterUserUseCase = new RegisterUserUseCase(
    userRepository,
    passwordHasher
  );

  /////////////////LOGIN USE CASE////////////////////////////
  const tokenGenerator = new TokenGenerator(env.JWT_SECERT);
  const loginUseCase: LoginUserUsecase = new LoginUserUsecase(
    logger,
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

  /////////////////////REFRESH TOKEN////////////////////////////////

  const refreshTokenUseCase: RefreshTokenUseCase = new RefreshTokenUseCase(
    tokenGenerator,
    userRepository
  );

  ////////////////////////GOOGLE SIGNUP//////////////////////////////////
  const googleClient = new GoogleClient();
  const googleSignupUseCase = new GoogleSignupUseCase(
    googleClient,
    userRepository,
    tokenGenerator
  );

  /////////AUTH CONTROLLER////////////////////////
  const controller: IauthController = new AuthController(
    registerUseCase,
    loginUseCase,
    sentSignupOtpUseCase,
    sentResetOtpUseCase,
    verifyOtpUseCase,
    resetPasswordUsecase,
    refreshTokenUseCase,
    googleSignupUseCase
  );
  return controller;
}
