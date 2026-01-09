import { IBlockUserUseCase } from '../../../application/usecases/Admin/IBlockUserUseCase';
import { IGetAllUsersUseCase } from '../../../application/usecases/Admin/IGetAllUsersUseCase';
import { UserResponseDTO } from '../../../domain/dto/authDTO';
import {
  GetAllUsersRequestDTO,
  GetAllUsersResponseDTO,
} from '../../../domain/dto/userManagementDTO';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { ApiResponse } from '../helpers/implementation/apiResponse';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IUserManagementController } from './IUserManagementController';

export class userManagementController implements IUserManagementController {
  constructor(
    private readonly _getAllUserUseCase: IGetAllUsersUseCase,
    private readonly _blockUserUseCase: IBlockUserUseCase
  ) {}

  async getAllUsers(httpRequest: HttpRequest): Promise<HttpResponse> {
    const parsed = httpRequest.query as Record<string, unknown>;
    const page = Number(parsed.page) || 1;
    const limit = Number(parsed.limit) || 2;
    const rawSearch = (parsed.search as string | undefined) ?? undefined;
    const trimmed = rawSearch?.toString().trim();
    const search = trimmed ? trimmed : undefined;
    const sortParam = (parsed.sort as string) === 'oldest' ? 'oldest' : 'newest';

    const dto: GetAllUsersRequestDTO = { page, limit, search, sort: sortParam };
    const result = await this._getAllUserUseCase.execute(dto);
    const response = ApiResponse.success<GetAllUsersResponseDTO>(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async blockUser(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId } = httpRequest.path as { userId: string };

    const result = await this._blockUserUseCase.execute(userId);
    const response = ApiResponse.success<UserResponseDTO>(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
