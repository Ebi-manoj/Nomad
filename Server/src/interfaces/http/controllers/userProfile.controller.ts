import { Unauthorized } from '../../../domain/errors/CustomError';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { IUserProfileController } from './IUserProfileController';
import { IGetUserProfileUseCase } from '../../../application/usecases/User/Profile/IGetUserProfileUseCase';
import { IUpdateUserProfileUseCase } from '../../../application/usecases/User/Profile/IUpdateUserProfileUseCase';
import { IUpdateUserProfileImageUseCase } from '../../../application/usecases/User/Profile/IUpdateUserProfileImageUseCase';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { ApiResponse } from '../helpers/implementation/apiResponse';
import { updateProfileImageSchema, updateProfileSchema } from '../../validators/userValidators';

export class UserProfileController implements IUserProfileController {
  constructor(
    private readonly _getUseCase: IGetUserProfileUseCase,
    private readonly _updateUseCase: IUpdateUserProfileUseCase,
    private readonly _updateImageUseCase: IUpdateUserProfileImageUseCase
  ) {}

  async getProfile(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const data = await this._getUseCase.execute(userId);
    const response = ApiResponse.success(data);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async updateProfile(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const dto = updateProfileSchema.parse(httpRequest.body);
    const result = await this._updateUseCase.execute(userId, dto);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async updateProfileImage(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const { fileURL } = updateProfileImageSchema.parse(httpRequest.body);
    const user = await this._updateImageUseCase.execute(userId, fileURL);
    const response = ApiResponse.success({ user });
    return new HttpResponse(HttpStatus.OK, response);
  }
}
