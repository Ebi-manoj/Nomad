import { IGetRideBookingOTPUseCase } from '../../../application/usecases/User/Task/IGetRideBookingOTP';
import { IGetTasksUseCase } from '../../../application/usecases/User/Task/IGetTasksUseCase';
import { RideBookingOTPReqDTO } from '../../../domain/dto/RideBookingDTO';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { Unauthorized } from '../../../domain/errors/CustomError';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { ITaskController } from './ITaskController';

export class TaskController implements ITaskController {
  constructor(
    private readonly getTasksUseCase: IGetTasksUseCase,
    private readonly getRideBookingOTPUseCase: IGetRideBookingOTPUseCase
  ) {}

  async getTasks(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { rideId } = httpRequest.query as { rideId: string };
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();
    const dto = { userId, rideId };
    const result = await this.getTasksUseCase.execute(dto);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async getTaskOTPForHiker(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { rideBookingId } = httpRequest.path as { rideBookingId: string };
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();
    const dto: RideBookingOTPReqDTO = { userId, rideBookingId };
    const result = await this.getRideBookingOTPUseCase.execute(dto);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
