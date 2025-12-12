import { IGetBookingLiveUseCase } from '../../../application/usecases/User/RideBooking/IGetBookingLive';
import { IGetRideBookingUseCase } from '../../../application/usecases/User/RideBooking/IGetRideBookingUseCase';
import { ICancelRideBookingUseCase } from '../../../application/usecases/User/RideBooking/ICancelRideBookingUseCase';
import { IMarkDropOffUseCase } from '../../../application/usecases/User/Task/IMarkDropOffUseCase';
import { MarkDroppOffReqDTO } from '../../../domain/dto/TaskDTO';
import {
  CancelRideBookingReqDTO,
  ReqCancelBookingReqDTO,
} from '../../../domain/dto/RideBookingDTO';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { Unauthorized } from '../../../domain/errors/CustomError';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IRideBookingController } from './IRideBookingController';
import { IReqCancelRideBookingUseCase } from '../../../application/usecases/User/RideBooking/IReqCancelRideBookingUseCase';
import { ApiResponse } from '../helpers/implementation/apiResponse';

export class RideBookingController implements IRideBookingController {
  constructor(
    private readonly _getRideBookingUseCase: IGetRideBookingUseCase,
    private readonly _markDroppOffUseCase: IMarkDropOffUseCase,
    private readonly _getBookingLiveUseCase: IGetBookingLiveUseCase,
    private readonly _cancelRideBookingUseCase: ICancelRideBookingUseCase,
    private readonly _reqCancelRideBookingUseCase: IReqCancelRideBookingUseCase
  ) {}

  async getRideBooking(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();
    const { bookingId } = httpRequest.path as { bookingId: string };
    const dto = { bookingId, userId };
    const result = await this._getRideBookingUseCase.execute(dto);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async markDroppOff(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { bookingId } = httpRequest.path as { bookingId: string };
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();
    const dto: MarkDroppOffReqDTO = { bookingId, userId };

    const result = await this._markDroppOffUseCase.execute(dto);
    const response = ApiResponse.success(result);

    return new HttpResponse(HttpStatus.OK, response);
  }

  async getRideBookingLive(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { bookingId } = httpRequest.path as { bookingId: string };
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();
    const result = await this._getBookingLiveUseCase.execute({
      bookingId,
      userId,
    });
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async cancelBooking(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();
    const { bookingId } = httpRequest.path as { bookingId: string };
    const dto: CancelRideBookingReqDTO = { bookingId, userId };
    const result = await this._cancelRideBookingUseCase.execute(dto);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async reqCancelBooking(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();
    const { bookingId } = httpRequest.path as { bookingId: string };
    const dto: ReqCancelBookingReqDTO = { bookingId, userId };

    const result = await this._reqCancelRideBookingUseCase.execute(dto);
    const response = ApiResponse.success(result);

    return new HttpResponse(HttpStatus.OK, response);
  }
}
