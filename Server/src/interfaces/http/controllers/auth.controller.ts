import { LoginUserUsecase } from '../../../application/usecases/LoginUserCase';
import { RegisterUserUseCase } from '../../../application/usecases/RegisterUserUseCase';
import { ResetPasswordUseCase } from '../../../application/usecases/ResetPasswordUseCase';
import { SendSignupOTPUseCase } from '../../../application/usecases/SendOTPSignupUseCase';
import { SendResetOTPUseCase } from '../../../application/usecases/SendResetOTPUseCase';
import { VerifyOTPUseCase } from '../../../application/usecases/VerifyOTPUseCase';
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
    private readonly resetPasswordUseCase: ResetPasswordUseCase
  ) {}

  async signup(httpRequest: HttpRequest): Promise<HttpResponse> {
    const result = signUpShema.safeParse(httpRequest.body);
    console.log(result);
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
    const user = await this.loginUserUseCase.execute(dto);

    const response = ApiDTO.success<LoginuserResponseDTO>(user);
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
}
