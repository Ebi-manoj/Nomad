import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import type { IGetSosLogsUseCase } from '../../../application/usecases/Admin/IGetSosLogsUseCase';
import type { IResolveSosUseCase } from '../../../application/usecases/Admin/IResolveSosUseCase';
import type { IAdminSosController } from './IAdminSosController';
import { GetSosLogsQuery } from '../../../domain/dto/SosDTO';
import { ApiResponse } from '../helpers/implementation/apiResponse';

export class AdminSosController implements IAdminSosController {
  constructor(
    private readonly getSosLogsUseCase: IGetSosLogsUseCase,
    private readonly resolveSosUseCase: IResolveSosUseCase
  ) {}

  async getSosLogs(httpRequest: HttpRequest): Promise<HttpResponse> {
    const parsed = httpRequest.query as Record<string, unknown>;

    const page = Number(parsed?.page) || 1;
    const status = (parsed?.status as string) || undefined;
    const query: GetSosLogsQuery = { page, status };

    const result = await this.getSosLogsUseCase.execute(query);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async resolveSos(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { sosLogId } = httpRequest.path as { sosLogId: string };

    const result = await this.resolveSosUseCase.execute(sosLogId);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
