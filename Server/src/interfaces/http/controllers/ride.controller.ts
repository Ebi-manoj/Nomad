import { HttpStatusCode } from 'axios';
import { CreateRideDTO } from '../../../domain/dto/RideDTO';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { ApiDTO } from '../helpers/implementation/apiDTO';
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

export class RideController implements IRideController {
  constructor(
    private readonly createRideUseCase: ICreateRideUseCase,
    private readonly getPendingRequestUseCase: IGetPendingRequestUseCase,
    private readonly acceptJoinRequestUseCase: IAcceptJoinRequestUseCase,
    private readonly declienJoinRequestUseCase: IDeclineJoinRequestUseCase,
    private readonly getHikerMatchedUseCase: IGetHikerMatchedUseCase,
    private readonly endRideUseCase: IEndRideUseCase,
    private readonly getRideDetailsUseCase: IGetRideDetailsUseCase
  ) {}

  async createRide(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = httpRequest.body as CreateRideDTO;
    const result = await this.createRideUseCase.execute(dto);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async getPendingJoinRequests(
    httpRequest: HttpRequest
  ): Promise<HttpResponse> {
    const { rideId } = httpRequest.path as { rideId: string };
    const result = await this.getPendingRequestUseCase.execute(rideId);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatusCode.Ok, response);
  }

  async acceptJoinRequests(httpRequest: HttpRequest): Promise<HttpResponse> {
    const data = httpRequest.body as { joinRequestId: string };
    const riderId = httpRequest.user?.id;
    const dto: AcceptJoinRequestDTO = { ...data, riderId: riderId! };

    const result = await this.acceptJoinRequestUseCase.execute(dto);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
  async declineJoinRequests(httpRequest: HttpRequest): Promise<HttpResponse> {
    const data = httpRequest.body as { joinRequestId: string };
    const riderId = httpRequest.user?.id;
    const dto: DeclineJoinRequestDTO = { ...data, riderId: riderId! };

    const result = await this.declienJoinRequestUseCase.execute(dto);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatusCode.Ok, response);
  }

  async getHikersMatched(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { rideId } = httpRequest.path as { rideId: string };
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();
    const result = await this.getHikerMatchedUseCase.execute({
      userId,
      rideId,
    });
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatusCode.Ok, response);
  }
  async endRide(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { rideId } = httpRequest.path as { rideId: string };
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const result = await this.endRideUseCase.execute({ rideId, userId });
    const response = ApiDTO.success(result);

    return new HttpResponse(HttpStatus.OK, response);
  }
  async getRideDetails(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { rideId } = httpRequest.path as { rideId: string };
    // const userId = httpRequest.user?.id;
    const { userId } = httpRequest.body as { userId: string };
    if (!userId) throw new Unauthorized();

    const result = await this.getRideDetailsUseCase.execute({ userId, rideId });
    const response = ApiDTO.success(result);

    return new HttpResponse(HttpStatus.OK, response);
  }
}
