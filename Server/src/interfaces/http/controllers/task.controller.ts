import { IGetTasksUseCase } from '../../../application/usecases/User/Task/IGetTasksUseCase';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { Unauthorized } from '../../../domain/errors/CustomError';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { ITaskController } from './ITaskController';

export class TaskController implements ITaskController {
  constructor(private readonly getTasksUseCase: IGetTasksUseCase) {}

  async getTasks(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { rideId } = httpRequest.query as { rideId: string };
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();
    const dto = { userId, rideId };
    const result = await this.getTasksUseCase.execute(dto);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
