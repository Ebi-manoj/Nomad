import { CreateRideUseCase } from '../../../application/usecases/User/Ride/CreateRideUseCase';
import { CreateRideDTO } from '../../../domain/dto/RideDTO';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IRideController } from './IRideController';

export class RideController implements IRideController {
  constructor(private readonly createRideUseCase: CreateRideUseCase) {}

  async createRide(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = httpRequest.body as CreateRideDTO;
    const result = await this.createRideUseCase.execute(dto);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
