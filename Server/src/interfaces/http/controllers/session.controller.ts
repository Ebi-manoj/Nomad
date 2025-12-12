import { IActiveSessionsUseCase } from '../../../application/usecases/User/IActiveSessionsUseCase';
import { ErrorMessages } from '../../../domain/enums/ErrorMessage';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { CustomError } from '../../../domain/errors/CustomError';
import { ApiResponse } from '../helpers/implementation/apiResponse';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { ISessionController } from './ISessionController';

export class SessionController implements ISessionController {
  constructor(private readonly _activeSessionUseCase: IActiveSessionsUseCase) {}
  async getActiveUserSession(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId)
      throw new CustomError(
        HttpStatus.UNAUTHORIZED,
        ErrorMessages.UNAUTHORIZED
      );

    const result = await this._activeSessionUseCase.execute(userId);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
