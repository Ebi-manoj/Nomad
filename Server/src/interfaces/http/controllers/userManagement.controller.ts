import { GetAllUsersUseCase } from '../../../application/usecases/Admin/GetAllUsersUseCase';
import {
  GetAllUsersRequestDTO,
  GetAllUsersResponseDTO,
} from '../../../domain/dto/userManagementDTO';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IUserManagementController } from './IUserManagementController';

export class userManagementController implements IUserManagementController {
  constructor(private readonly getAllUserUseCase: GetAllUsersUseCase) {}

  async getAllUsers(httpRequest: HttpRequest): Promise<HttpResponse> {
    const parsed = httpRequest.query as Record<string, unknown>;
    const page = Number(parsed.page) || 1;
    const limit = Number(parsed.limit) || 10;
    const search = parsed.search as string | undefined;

    const dto: GetAllUsersRequestDTO = { page, limit, search };
    const result = await this.getAllUserUseCase.execute(dto);
    const response = ApiDTO.success<GetAllUsersResponseDTO>(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
