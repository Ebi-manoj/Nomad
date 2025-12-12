import { ICompleteTaskUseCase } from '../../../application/usecases/User/Task/ICompleteTaskUseCase';
import { IGetRideBookingOTPUseCase } from '../../../application/usecases/User/Task/IGetRideBookingOTP';
import { IGetTasksUseCase } from '../../../application/usecases/User/Task/IGetTasksUseCase';
import { RideBookingOTPReqDTO } from '../../../domain/dto/RideBookingDTO';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { Unauthorized } from '../../../domain/errors/CustomError';
import { ApiResponse } from '../helpers/implementation/apiResponse';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { ITaskController } from './ITaskController';

export class TaskController implements ITaskController {
  constructor(
    private readonly _getTasksUseCase: IGetTasksUseCase,
    private readonly _getRideBookingOTPUseCase: IGetRideBookingOTPUseCase,
    private readonly _completeTaskUseCase: ICompleteTaskUseCase
  ) {}

  async getTasks(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { rideId } = httpRequest.query as { rideId: string };
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();
    const dto = { userId, rideId };
    const result = await this._getTasksUseCase.execute(dto);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async getTaskOTPForHiker(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { rideBookingId } = httpRequest.path as { rideBookingId: string };
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();
    const dto: RideBookingOTPReqDTO = { userId, rideBookingId };
    const result = await this._getRideBookingOTPUseCase.execute(dto);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
  async completeTask(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { taskId } = httpRequest.path as { taskId: string };
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();
    const { otp } = httpRequest.body as { otp?: string };
    const dto = { taskId, userId, otp };

    const result = await this._completeTaskUseCase.execute(dto);
    const response = ApiResponse.success(result);

    return new HttpResponse(HttpStatus.OK, response);
  }
}
