import { IGetAllRideUseCase } from '../../../application/usecases/Admin/IGetAllRideUseCase';
import { IAdminRideDetailsUseCase } from '../../../application/usecases/Admin/IAdminRideDetailsUseCase';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IAdminRideController } from './IAdminRideController';

export class AdminRideController implements IAdminRideController {
  constructor(
    private readonly getAllRideUseCase: IGetAllRideUseCase,
    private readonly getRideDetailsUseCase: IAdminRideDetailsUseCase
  ) {}

  async getAllRides(httpRequest: HttpRequest): Promise<HttpResponse> {
    const q = httpRequest.query as Record<string, unknown>;

    const page = Number(q.page) || 1;
    const status = (q.status as string) || undefined;

    const result = await this.getAllRideUseCase.execute(page, status);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async getRideDetails(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { rideId } = httpRequest.path as { rideId: string };
    const result = await this.getRideDetailsUseCase.execute(rideId);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
