import { IReviewController } from './IReviewController';
import { RateUserReqDTO } from '../../../domain/dto/Reviews';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { Unauthorized } from '../../../domain/errors/CustomError';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IRateUserUseCase } from '../../../application/usecases/User/Ratings/IRateUserUseCase';
import { ApiResponse } from '../helpers/implementation/apiResponse';

export class ReviewController implements IReviewController {
  constructor(private readonly _rateUserUseCase: IRateUserUseCase) {}

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

    const result = await this._rateUserUseCase.execute(dto);
    const response = ApiResponse.success(result);

    return new HttpResponse(HttpStatus.OK, response);
  }
}
