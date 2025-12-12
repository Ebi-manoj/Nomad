import { HttpStatusCode } from 'axios';
import {
  CreateHikeDTO,
  CreateJoinRequestDTO,
} from '../../../domain/dto/HikeDTO';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IHikeController } from './IHikeController';
import { ICreateHikeUseCase } from '../../../application/usecases/User/Hike/ICreateHikeUseCase';
import { IFindMatchRideUseCase } from '../../../application/usecases/User/Hike/IFindMatchRideUseCase';
import { ICreateJoinRequestUseCase } from '../../../application/usecases/User/Hike/ICreateJoinRequestUseCase';
import { Unauthorized } from '../../../domain/errors/CustomError';
import { IGetHikeDetailsUseCase } from '../../../application/usecases/User/Hike/IGetHikeDetails';
import { IGetAllHikesUseCase } from '../../../application/usecases/User/Hike/IGetAllHikesUseCase';
import { ApiResponse } from '../helpers/implementation/apiResponse';

export class HikeController implements IHikeController {
  constructor(
    private readonly _createHikeUseCase: ICreateHikeUseCase,
    private readonly _findMatchRidesUseCase: IFindMatchRideUseCase,
    private readonly _createJoinRequestUseCase: ICreateJoinRequestUseCase,
    private readonly _gethikeDetailsUseCase: IGetHikeDetailsUseCase,
    private readonly _getAllHikesUseCase: IGetAllHikesUseCase
  ) {}
  async createHike(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto: CreateHikeDTO = httpRequest.body as CreateHikeDTO;
    const result = await this._createHikeUseCase.execute(dto);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async matchRides(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = httpRequest.body as { hikeId: string };

    const result = await this._findMatchRidesUseCase.execute(dto.hikeId);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
  async joinRideRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = httpRequest.body as CreateJoinRequestDTO;
    const result = await this._createJoinRequestUseCase.execute(dto);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatusCode.Ok, response);
  }

  async getHikeDetails(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { hikeId } = httpRequest.path as { hikeId: string };
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();
    const result = await this._gethikeDetailsUseCase.execute({
      hikeId,
      userId,
    });
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async getHikes(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const parsed = httpRequest.query as Record<string, unknown>;
    const page = Number(parsed.page) || 1;
    const status = parsed.status as string | undefined;

    const result = await this._getAllHikesUseCase.execute({
      userId,
      page,
      status,
    });

    const response = ApiResponse.success(result);

    return new HttpResponse(HttpStatus.OK, response);
  }
}
