import { RegisterUserUseCase } from '../../../application/usecases/RegisterUserUseCase';
import { RegisterUserResponseDTO } from '../../../domain/dto/authDTO';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IauthController } from './Icontroller';

export class AuthController implements IauthController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  async signup(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = httpRequest.body as {
      fullName: string;
      email: string;
      mobile: string;
      password: string;
    };

    const user = await this.registerUserUseCase.execute(dto);
    const response = ApiDTO.success<RegisterUserResponseDTO>(user);
    return new HttpResponse(HttpStatus.CREATED, response);
  }
}
