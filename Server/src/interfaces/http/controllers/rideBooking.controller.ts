import { IGetRideBookingUseCase } from '../../../application/usecases/User/RideBooking/IGetRideBookingUseCase';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { Unauthorized } from '../../../domain/errors/CustomError';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IRideBookingController } from './IRideBookingController';

export class RideBookingController implements IRideBookingController {
  constructor(private readonly getRideBookingUseCase: IGetRideBookingUseCase) {}

  async getRideBooking(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();
    const { bookingId } = httpRequest.path as { bookingId: string };
    const dto = { bookingId, userId };
    const result = await this.getRideBookingUseCase.execute(dto);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
