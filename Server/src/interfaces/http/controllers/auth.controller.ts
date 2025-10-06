import { GoogleSignupUseCase } from '../../../application/usecases/Auth/GoogleSignupUseCase.ts.js';
import { LoginUserUsecase } from '../../../application/usecases/Auth/LoginUserCase.js';
import { RefreshTokenUseCase } from '../../../application/usecases/Auth/RefreshTokenUseCase.js';
import { RegisterUserUseCase } from '../../../application/usecases/Auth/RegisterUserUseCase.js';
import { ResetPasswordUseCase } from '../../../application/usecases/Auth/ResetPasswordUseCase.js';
import { SendSignupOTPUseCase } from '../../../application/usecases/Auth/SendOTPSignupUseCase.js';
import { SendResetOTPUseCase } from '../../../application/usecases/Auth/SendResetOTPUseCase.js';
import { VerifyOTPUseCase } from '../../../application/usecases/Auth/VerifyOTPUseCase.js';
import {
  LoginUserRequestDTO,
  LoginuserResponseDTO,
  RegisterUserRequestDTO,
  SentOTPResponseDTO,
  UserResponseDTO,
  VerifyOTPResponseDTO,
} from '../../../domain/dto/authDTO';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import {
  InvalidCredindatials,
  InvalidInputData,
} from '../../../domain/errors/CustomError';
import { loginSchema, signUpShema } from '../../validators/authValidators';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IauthController } from './IAuthcontroller';

export class AuthController implements IauthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUsecase,
    private readonly sendSignupOTPUseCase: SendSignupOTPUseCase,
    private readonly sendResetOTPuseCase: SendResetOTPUseCase,
    private readonly verifyOTPUseCase: VerifyOTPUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly googleSignupUseCase: GoogleSignupUseCase
  ) {}

  async signup(httpRequest: HttpRequest): Promise<HttpResponse> {
    const result = signUpShema.safeParse(httpRequest.body);
    if (!result.success) throw new InvalidInputData();

    const dto: RegisterUserRequestDTO = result.data;
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
    const dto = httpRequest.body as {
      email: string;
    };
    const message = await this.sendSignupOTPUseCase.execute(dto);
    const response = ApiDTO.success<SentOTPResponseDTO>(message);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async sendResetOTP(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = httpRequest.body as {
      email: string;
    };
    const message = await this.sendResetOTPuseCase.execute(dto);
    const response = ApiDTO.success<SentOTPResponseDTO>(message);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async verifyOTP(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = httpRequest.body as {
      email: string;
      otp: string;
    };
    const result = await this.verifyOTPUseCase.execute(dto);
    const response = ApiDTO.success<VerifyOTPResponseDTO>(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async resetPassword(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = httpRequest.body as {
      email: string;
      password: string;
    };
    const result = await this.resetPasswordUseCase.execute(dto);

    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async refreshToken(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = httpRequest.cookies as { refreshToken: string };
    const result = await this.refreshTokenUseCase.execute(dto);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async googleSingup(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = httpRequest.body as { code: string };
    const result = await this.googleSignupUseCase.execute(dto);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
