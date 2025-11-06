import { HttpStatusCode } from 'axios';
import { Unauthorized } from '../../../domain/errors/CustomError';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IPaymentController } from './IPaymentController';
import { paymentIntentRequestDTO } from '../../../domain/dto/paymentService';
import { IGetHikerPaymentInfoUseCase } from '../../../application/usecases/User/Hike/IGetHikerPaymentInfo';
import { ICreatePaymentIntentUseCase } from '../../../application/usecases/User/payment/ICreatePaymentIntent';

export class PaymentController implements IPaymentController {
  constructor(
    private readonly getHikerPaymentInfoUseCase: IGetHikerPaymentInfoUseCase,
    private readonly createPaymentIntentUseCase: ICreatePaymentIntentUseCase
  ) {}
  async getPaymentInfo(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    const { paymentId } = httpRequest.path as { paymentId: string };
    if (!userId) throw new Unauthorized();
    const dto = { paymentId, userId };

    const result = await this.getHikerPaymentInfoUseCase.execute(dto);
    const response = ApiDTO.success(result);

    return new HttpResponse(HttpStatusCode.Ok, response);
  }

  async createPaymentIntent(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = httpRequest.body as paymentIntentRequestDTO;
    const result = await this.createPaymentIntentUseCase.execute(dto);
    const response = ApiDTO.success(result);

    return new HttpResponse(HttpStatusCode.Ok, response);
  }
}
