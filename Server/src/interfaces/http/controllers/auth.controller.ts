import { GoogleSignupUseCase } from '../../../application/usecases/Auth/GoogleSignupUseCase.ts.js';
import { IGoogleSignupUseCase } from '../../../application/usecases/Auth/IGoogleSignupUseCase.js';
import { ILoginUserUsecase } from '../../../application/usecases/Auth/ILoginUserUseCase.js';
import { IRefreshTokenUseCase } from '../../../application/usecases/Auth/IRefreshTokenUseCase.js';
import { IRegisterUserUseCase } from '../../../application/usecases/Auth/IRegisterUserUseCase.js';
import { IResetPasswordUseCase } from '../../../application/usecases/Auth/IResetPassword.js';
import { ISendSignupOTPUseCase } from '../../../application/usecases/Auth/ISendOTPSignupUseCase.js';
import { ISendResetOTPUseCase } from '../../../application/usecases/Auth/ISendResetOTP.js';
import { IVerifyOTPUseCase } from '../../../application/usecases/Auth/IVerifOTPUseCase.js';
import { LoginUserUsecase } from '../../../application/usecases/Auth/LoginUserCase.js';
import { RefreshTokenUseCase } from '../../../application/usecases/Auth/RefreshTokenUseCase.js';
import { ResetPasswordUseCase } from '../../../application/usecases/Auth/ResetPasswordUseCase.js';
import { SendSignupOTPUseCase } from '../../../application/usecases/Auth/SendOTPSignupUseCase.js';
import { SendResetOTPUseCase } from '../../../application/usecases/Auth/SendResetOTPUseCase.js';
import { VerifyOTPUseCase } from '../../../application/usecases/Auth/VerifyOTPUseCase.js';
import {
  LoginUserRequestDTO,
  LoginuserResponseDTO,
  SentOTPResponseDTO,
  UserResponseDTO,
  VerifyOTPResponseDTO,
} from '../../../domain/dto/authDTO';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { InvalidCredindatials } from '../../../domain/errors/CustomError';
import {
  emailSchema,
  googleCodeSchema,
  loginSchema,
  refreshTokenSchema,
  resetPasswordSchema,
  signUpShema,
  verifyOTPSchema,
} from '../../validators/authValidators';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IauthController } from './IAuthcontroller';

export class AuthController implements IauthController {
  constructor(
    private readonly registerUserUseCase: IRegisterUserUseCase,
    private readonly loginUserUseCase: ILoginUserUsecase,
    private readonly sendSignupOTPUseCase: ISendSignupOTPUseCase,
    private readonly sendResetOTPuseCase: ISendResetOTPUseCase,
    private readonly verifyOTPUseCase: IVerifyOTPUseCase,
    private readonly resetPasswordUseCase: IResetPasswordUseCase,
    private readonly refreshTokenUseCase: IRefreshTokenUseCase,
    private readonly googleSignupUseCase: IGoogleSignupUseCase
  ) {}

  async signup(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = signUpShema.parse(httpRequest.body);
    const user = await this.registerUserUseCase.execute(dto);
    const response = ApiDTO.success<UserResponseDTO>(user);
    return new HttpResponse(HttpStatus.CREATED, response);
  }
  async login(httpRequest: HttpRequest): Promise<HttpResponse> {
    const result = loginSchema.safeParse(httpRequest.body);
    if (!result.success) throw new InvalidCredindatials();

    const dto: LoginUserRequestDTO = result.data;
    const loginDetails = await this.loginUserUseCase.execute(dto);

    const response = ApiDTO.success<LoginuserResponseDTO>(loginDetails);

    return new HttpResponse(HttpStatus.OK, response);
  }

  async sendSignupOTP(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = emailSchema.parse(httpRequest.body);
    const message = await this.sendSignupOTPUseCase.execute(dto);
    const response = ApiDTO.success<SentOTPResponseDTO>(message);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async sendResetOTP(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = emailSchema.parse(httpRequest.body);
    const message = await this.sendResetOTPuseCase.execute(dto);
    const response = ApiDTO.success<SentOTPResponseDTO>(message);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async verifyOTP(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = verifyOTPSchema.parse(httpRequest.body);
    const result = await this.verifyOTPUseCase.execute(dto);
    const response = ApiDTO.success<VerifyOTPResponseDTO>(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async resetPassword(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = resetPasswordSchema.parse(httpRequest.body);
    const result = await this.resetPasswordUseCase.execute(dto);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async refreshToken(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = refreshTokenSchema.parse(httpRequest.cookies);
    const result = await this.refreshTokenUseCase.execute(dto);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async googleSingup(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = googleCodeSchema.parse(httpRequest.body);
    const result = await this.googleSignupUseCase.execute(dto);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
