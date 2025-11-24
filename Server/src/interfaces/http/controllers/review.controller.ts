import { IReviewController } from './IReviewController';
import { RateUserReqDTO } from '../../../domain/dto/Reviews';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { Unauthorized } from '../../../domain/errors/CustomError';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IRateUserUseCase } from '../../../application/usecases/User/Ratings/IRateUserUseCase';

export class ReviewController implements IReviewController {
  constructor(private readonly rateUserUseCase: IRateUserUseCase) {}

  async rateUser(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.user?.id;
    if (!userId) throw new Unauthorized();

    const body = httpRequest.body as Omit<RateUserReqDTO, 'userId'>;

    const dto: RateUserReqDTO = {
      userId,
      reviewedUserId: body.reviewedUserId,
      rating: body.rating,
      reviewText: body.reviewText,
      bookingId: body.bookingId,
      type: body.type,
    };

    const result = await this.rateUserUseCase.execute(dto);
    const response = ApiDTO.success(result);

    return new HttpResponse(HttpStatus.OK, response);
  }
}
