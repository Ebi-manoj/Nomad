import { IGetAllRideUseCase } from '../../../application/usecases/Admin/IGetAllRideUseCase';
import { IAdminRideDetailsUseCase } from '../../../application/usecases/Admin/IAdminRideDetailsUseCase';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IAdminRideController } from './IAdminRideController';
import { ApiResponse } from '../helpers/implementation/apiResponse';

export class AdminRideController implements IAdminRideController {
  constructor(
    private readonly _getAllRideUseCase: IGetAllRideUseCase,
    private readonly _getRideDetailsUseCase: IAdminRideDetailsUseCase
  ) {}

  async getAllRides(httpRequest: HttpRequest): Promise<HttpResponse> {
    const query = httpRequest.query as Record<string, unknown>;

    const page = Number(query.page) || 1;
    const status = (query.status as string) || undefined;
    const search = (query.search as string) || undefined;
    const sort = (query.sort as 'newest' | 'oldest') || undefined;

    const result = await this._getAllRideUseCase.execute(
      page,
      status,
      search,
      sort
    );
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async getRideDetails(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { rideId } = httpRequest.path as { rideId: string };
    const result = await this._getRideDetailsUseCase.execute(rideId);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
