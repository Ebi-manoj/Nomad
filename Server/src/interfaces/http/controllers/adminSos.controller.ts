import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { SosLogStatus } from '../../../domain/enums/SosLogStatus';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import type { IGetSosLogsUseCase } from '../../../application/usecases/Admin/IGetSosLogsUseCase';
import type { IAdminSosController } from './IAdminSosController';
import { GetSosLogsQuery } from '../../../domain/dto/SosDTO';

export class AdminSosController implements IAdminSosController {
  constructor(private readonly getSosLogsUseCase: IGetSosLogsUseCase) {}

  async getSosLogs(httpRequest: HttpRequest): Promise<HttpResponse> {
    const parsed = httpRequest.query as Record<string, unknown>;

    const page = Number(parsed?.page) || 1;
    const status = (parsed?.status as string) || undefined;
    const query: GetSosLogsQuery = { page, status };

    const result = await this.getSosLogsUseCase.execute(query);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
