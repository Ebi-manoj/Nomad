import { HttpStatusCode } from 'axios';
import { CreateRideDTO } from '../../../domain/dto/RideDTO';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IRideController } from './IRideController';
import {
  AcceptJoinRequestDTO,
  DeclineJoinRequestDTO,
} from '../../../domain/dto/RideMatch';
import { ICreateRideUseCase } from '../../../application/usecases/User/Ride/ICreateRideUseCase';
import { IGetPendingRequestUseCase } from '../../../application/usecases/User/Ride/IGetPendingRequestUseCase';
import { IAcceptJoinRequestUseCase } from '../../../application/usecases/User/Ride/IAcceptJoinRequest';
import { IDeclineJoinRequestUseCase } from '../../../application/usecases/User/Ride/IDeclineJoinRequest';
import { Unauthorized } from '../../../domain/errors/CustomError';
import { IGetHikerMatchedUseCase } from '../../../application/usecases/User/Ride/IGetHikersMatched';
import { IEndRideUseCase } from '../../../application/usecases/User/Ride/IEndRideUseCase';
import { IGetRideDetailsUseCase } from '../../../application/usecases/User/Ride/IGetRideDetailsUseCase';
import { IGetAllRidesUseCase } from '../../../application/usecases/User/Ride/IGetAllRidesUseCase';
import { ApiResponse } from '../helpers/implementation/apiResponse';

export class RideController implements IRideController {
  constructor(
    private readonly _createRideUseCase: ICreateRideUseCase,
    private readonly _getPendingRequestUseCase: IGetPendingRequestUseCase,
    private readonly _acceptJoinRequestUseCase: IAcceptJoinRequestUseCase,
    private readonly _declienJoinRequestUseCase: IDeclineJoinRequestUseCase,
    private readonly _getHikerMatchedUseCase: IGetHikerMatchedUseCase,
    private readonly _endRideUseCase: IEndRideUseCase,
    private readonly _getRideDetailsUseCase: IGetRideDetailsUseCase,
    private readonly _getAllRidesUseCase: IGetAllRidesUseCase
  ) {}

  async createRide(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = httpRequest.body as CreateRideDTO;
    const result = await this._createRideUseCase.execute(dto);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async getRides(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const parsed = httpRequest.query as Record<string, unknown>;
    const page = Number(parsed.page) || 1;
    const status = parsed.status as string | undefined;

    const result = await this._getAllRidesUseCase.execute({
      userId,
      page,
      status,
    });

    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async getPendingJoinRequests(
    httpRequest: HttpRequest
  ): Promise<HttpResponse> {
    const { rideId } = httpRequest.path as { rideId: string };
    const result = await this._getPendingRequestUseCase.execute(rideId);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatusCode.Ok, response);
  }

  async acceptJoinRequests(httpRequest: HttpRequest): Promise<HttpResponse> {
    const data = httpRequest.body as { joinRequestId: string };
    const riderId = httpRequest.user?.id;
    const dto: AcceptJoinRequestDTO = { ...data, riderId: riderId! };

    const result = await this._acceptJoinRequestUseCase.execute(dto);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
  async declineJoinRequests(httpRequest: HttpRequest): Promise<HttpResponse> {
    const data = httpRequest.body as { joinRequestId: string };
    const riderId = httpRequest.user?.id;
    const dto: DeclineJoinRequestDTO = { ...data, riderId: riderId! };

    const result = await this._declienJoinRequestUseCase.execute(dto);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatusCode.Ok, response);
  }

  async getHikersMatched(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { rideId } = httpRequest.path as { rideId: string };
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();
    const result = await this._getHikerMatchedUseCase.execute({
      userId,
      rideId,
    });
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatusCode.Ok, response);
  }
  async endRide(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { rideId } = httpRequest.path as { rideId: string };
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const result = await this._endRideUseCase.execute({ rideId, userId });
    const response = ApiResponse.success(result);

    return new HttpResponse(HttpStatus.OK, response);
  }
  async getRideDetails(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { rideId } = httpRequest.path as { rideId: string };
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const result = await this._getRideDetailsUseCase.execute({
      userId,
      rideId,
    });
    const response = ApiResponse.success(result);

    return new HttpResponse(HttpStatus.OK, response);
  }
}
