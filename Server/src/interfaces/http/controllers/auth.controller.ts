import { IGoogleSignupUseCase } from '../../../application/usecases/Auth/IGoogleSignupUseCase.js';
import { ILoginUserUsecase } from '../../../application/usecases/Auth/ILoginUserUseCase.js';
import { IRefreshTokenUseCase } from '../../../application/usecases/Auth/IRefreshTokenUseCase.js';
import { IRegisterUserUseCase } from '../../../application/usecases/Auth/IRegisterUserUseCase.js';
import { IResetPasswordUseCase } from '../../../application/usecases/Auth/IResetPassword.js';
import { IChangePasswordUseCase } from '../../../application/usecases/Auth/IChangePasswordUseCase.js';
import { ISendSignupOTPUseCase } from '../../../application/usecases/Auth/ISendOTPSignupUseCase.js';
import { ISendResetOTPUseCase } from '../../../application/usecases/Auth/ISendResetOTP.js';
import { IVerifyOTPUseCase } from '../../../application/usecases/Auth/IVerifOTPUseCase.js';
import {
  LoginUserRequestDTO,
  LoginuserResponseDTO,
  SentOTPResponseDTO,
  UserResponseDTO,
  VerifyOTPResponseDTO,
} from '../../../domain/dto/authDTO';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { InvalidCredindatials, Unauthorized } from '../../../domain/errors/CustomError';
import {
  emailSchema,
  googleCodeSchema,
  loginSchema,
  refreshTokenSchema,
  resetPasswordSchema,
  signUpShema,
  verifyOTPSchema,
} from '../../validators/authValidators';
import { changePasswordSchema } from '../../validators/userValidators';
import { ApiResponse } from '../helpers/implementation/apiResponse.js';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IauthController } from './IAuthcontroller';

export class AuthController implements IauthController {
  constructor(
    private readonly _registerUserUseCase: IRegisterUserUseCase,
    private readonly _loginUserUseCase: ILoginUserUsecase,
    private readonly _sendSignupOTPUseCase: ISendSignupOTPUseCase,
    private readonly _sendResetOTPuseCase: ISendResetOTPUseCase,
    private readonly _verifyOTPUseCase: IVerifyOTPUseCase,
    private readonly _resetPasswordUseCase: IResetPasswordUseCase,
    private readonly _refreshTokenUseCase: IRefreshTokenUseCase,
    private readonly _googleSignupUseCase: IGoogleSignupUseCase,
    private readonly _changePasswordUseCase: IChangePasswordUseCase
  ) {}

  async signup(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = signUpShema.parse(httpRequest.body);
    const user = await this._registerUserUseCase.execute(dto);
    const response = ApiResponse.success<UserResponseDTO>(user);
    return new HttpResponse(HttpStatus.CREATED, response);
  }
  async login(httpRequest: HttpRequest): Promise<HttpResponse> {
    const result = loginSchema.safeParse(httpRequest.body);
    if (!result.success) throw new InvalidCredindatials();

    const dto: LoginUserRequestDTO = result.data;
    const loginDetails = await this._loginUserUseCase.execute(dto);

    const response = ApiResponse.success<LoginuserResponseDTO>(loginDetails);

    return new HttpResponse(HttpStatus.OK, response);
  }

  async sendSignupOTP(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = emailSchema.parse(httpRequest.body);
    const message = await this._sendSignupOTPUseCase.execute(dto);
    const response = ApiResponse.success<SentOTPResponseDTO>(message);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async sendResetOTP(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = emailSchema.parse(httpRequest.body);
    const message = await this._sendResetOTPuseCase.execute(dto);
    const response = ApiResponse.success<SentOTPResponseDTO>(message);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async verifyOTP(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = verifyOTPSchema.parse(httpRequest.body);
    const result = await this._verifyOTPUseCase.execute(dto);
    const response = ApiResponse.success<VerifyOTPResponseDTO>(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async resetPassword(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = resetPasswordSchema.parse(httpRequest.body);
    const result = await this._resetPasswordUseCase.execute(dto);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async refreshToken(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = refreshTokenSchema.parse(httpRequest.cookies);
    const result = await this._refreshTokenUseCase.execute(dto);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async googleSingup(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = googleCodeSchema.parse(httpRequest.body);
    const result = await this._googleSignupUseCase.execute(dto);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async changePassword(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();
    const parsed = changePasswordSchema.parse(httpRequest.body);
    const result = await this._changePasswordUseCase.execute({
      userId,
      currentPassword: parsed.currentPassword,
      newPassword: parsed.newPassword,
    });
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
