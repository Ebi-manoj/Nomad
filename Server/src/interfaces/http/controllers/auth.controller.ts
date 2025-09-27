import { LoginUserUsecase } from '../../../application/usecases/LoginUserCase';
import { RegisterUserUseCase } from '../../../application/usecases/RegisterUserUseCase';
import {
  LoginUserRequestDTO,
  LoginuserResponseDTO,
  RegisterUserRequestDTO,
  UserResponseDTO,
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
import { IauthController } from './Icontroller';

export class AuthController implements IauthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUsecase
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
}
