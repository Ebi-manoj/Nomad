import { HttpStatusCode } from 'axios';
import { CreateRideUseCase } from '../../../application/usecases/User/Ride/CreateRideUseCase';
import { GetPendingRequestUseCase } from '../../../application/usecases/User/Ride/GetPendingRequestUseCase';
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
import { AcceptJoinRequestUseCase } from '../../../application/usecases/User/Ride/AcceptJoinRequest';
import { Server } from 'socket.io';
import { DeclineJoinRequestUseCase } from '../../../application/usecases/User/Ride/DeclineJoinRequest';

export class RideController implements IRideController {
  constructor(
    private readonly createRideUseCase: CreateRideUseCase,
    private readonly getPendingRequestUseCase: GetPendingRequestUseCase,
    private readonly acceptJoinRequestUseCase: AcceptJoinRequestUseCase,
    private readonly declienJoinRequestUseCase: DeclineJoinRequestUseCase,
    private readonly io: Server
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
    this.io.of('/hiker').to(result.hikeId).emit('joinRequest:accepted', result);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
  async declineJoinRequests(httpRequest: HttpRequest): Promise<HttpResponse> {
    const data = httpRequest.body as { joinRequestId: string };
    const riderId = httpRequest.user?.id;
    const dto: DeclineJoinRequestDTO = { ...data, riderId: riderId! };

    const result = await this.declienJoinRequestUseCase.execute(dto);
    const response = ApiDTO.success(result);
    this.io.of('/hiker').to(result.hikeId).emit('joinRequest:declined', result);
    return new HttpResponse(HttpStatusCode.Ok, response);
  }
}
