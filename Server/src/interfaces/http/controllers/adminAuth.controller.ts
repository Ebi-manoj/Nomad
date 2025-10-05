import { AdminLoginUseCase } from '../../../application/usecases/Admin/AdminLoginUseCase';
import { LoginAdminResponseDTO } from '../../../domain/dto/authDTO';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IAdminAuthController } from './IAdminAuthController';

export class AdminAuthController implements IAdminAuthController {
  constructor(private readonly adminLoginUseCase: AdminLoginUseCase) {}
  async login(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = httpRequest.body as { email: string; password: string };
    const result = await this.adminLoginUseCase.execute(dto);
    const response = ApiDTO.success<LoginAdminResponseDTO>(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
