import { IAdminGetHikeDetailsUseCase } from '../../../application/usecases/Admin/IAdminHikeDetailsUseCase';
import { IGetAllHikesUseCase } from '../../../application/usecases/Admin/IGetAllHikeUseCase';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { ApiResponse } from '../helpers/implementation/apiResponse';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IAdminHikeController } from './IAdminHikeController';

export class AdminHikeController implements IAdminHikeController {
  constructor(
    private readonly getAllHikeUseCase: IGetAllHikesUseCase,
    private readonly getHikeDetailsUseCase: IAdminGetHikeDetailsUseCase
  ) {}
  async getAllHikes(httpRequest: HttpRequest): Promise<HttpResponse> {
    const query = httpRequest.query as Record<string, unknown>;

    const page = Number(query.page) || 1;
    const status = (query.status as string) || undefined;

    const result = await this.getAllHikeUseCase.execute(page, status);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
  async getHikeDetails(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { hikeId } = httpRequest.path as { hikeId: string };
    const result = await this.getHikeDetailsUseCase.execute(hikeId);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
