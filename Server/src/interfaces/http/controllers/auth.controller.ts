import { LoginUserUsecase } from '../../../application/usecases/LoginUserCase';
import { RegisterUserUseCase } from '../../../application/usecases/RegisterUserUseCase';
import { UserResponseDTO } from '../../../domain/dto/authDTO';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
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
    const dto = httpRequest.body as {
      fullName: string;
      email: string;
      mobile: string;
      password: string;
    };

    const user = await this.registerUserUseCase.execute(dto);
    const response = ApiDTO.success<UserResponseDTO>(user);
    return new HttpResponse(HttpStatus.CREATED, response);
  }
  async login(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = httpRequest.body as {
      email: string;
      password: string;
    };
    console.log(dto);
    const user = await this.loginUserUseCase.execute(dto);
    const response = ApiDTO.success<UserResponseDTO>(user);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
