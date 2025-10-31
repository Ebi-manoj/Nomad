import { ActiveSessionsUseCase } from '../../../application/usecases/User/ActiveSessionsUseCase';
import { ErrorMessages } from '../../../domain/enums/ErrorMessage';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { CustomError } from '../../../domain/errors/CustomError';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { ISessionController } from './ISessionController';

export class SessionController implements ISessionController {
  constructor(private readonly activeSessionUseCase: ActiveSessionsUseCase) {}
  async getActiveUserSession(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId)
      throw new CustomError(
        HttpStatus.UNAUTHORIZED,
        ErrorMessages.UNAUTHORIZED
      );

    const result = await this.activeSessionUseCase.execute(userId);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
