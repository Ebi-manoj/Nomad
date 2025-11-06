import { IBlockUserUseCase } from '../../../application/usecases/Admin/IBlockUserUseCase';
import { IGetAllUsersUseCase } from '../../../application/usecases/Admin/IGetAllUsersUseCase';
import { UserResponseDTO } from '../../../domain/dto/authDTO';
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
  constructor(
    private readonly getAllUserUseCase: IGetAllUsersUseCase,
    private readonly blockUserUseCase: IBlockUserUseCase
  ) {}

  async getAllUsers(httpRequest: HttpRequest): Promise<HttpResponse> {
    const parsed = httpRequest.query as Record<string, unknown>;
    const page = Number(parsed.page) || 1;
    const limit = Number(parsed.limit) || 2;
    const search = parsed.search as string | undefined;

    const dto: GetAllUsersRequestDTO = { page, limit, search };
    const result = await this.getAllUserUseCase.execute(dto);
    const response = ApiDTO.success<GetAllUsersResponseDTO>(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async blockUser(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId } = httpRequest.path as { userId: string };

    const result = await this.blockUserUseCase.execute(userId);
    const response = ApiDTO.success<UserResponseDTO>(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
