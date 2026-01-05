import { Unauthorized } from '../../../domain/errors/CustomError';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { IUserProfileController } from './IUserProfileController';
import { IGetUserProfileUseCase } from '../../../application/usecases/User/Profile/IGetUserProfileUseCase';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { ApiResponse } from '../helpers/implementation/apiResponse';

export class UserProfileController implements IUserProfileController {
  constructor(private readonly _useCase: IGetUserProfileUseCase) {}

  async getProfile(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const data = await this._useCase.execute(userId);
    const response = ApiResponse.success(data);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
