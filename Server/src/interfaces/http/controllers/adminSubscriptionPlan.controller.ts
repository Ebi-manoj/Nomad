import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { SubscriptionFeatures } from '../../../domain/entities/Subscription';
import { CreateSubscriptionPlanDTO } from '../../../domain/dto/adminSubscription';
import { ApiResponse } from '../helpers/implementation/apiResponse';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { ICreateSubscriptionPlanUseCase } from '../../../application/usecases/Admin/ICreateSubscriptionPlan';
import { IAdminSubscriptionPlanController } from './IAdminSubscriptionPlanController';
import { z } from 'zod';
import { createPlanSchema } from '../../validators/subscriptionPlan';
import { IGetSubscriptionPlanUseCase } from '../../../application/usecases/Admin/IGetSubscriptionPlans';

export class AdminSubscriptionPlanController
  implements IAdminSubscriptionPlanController
{
  constructor(
    private readonly _createPlanUseCase: ICreateSubscriptionPlanUseCase,
    private readonly _getPlanUseCase: IGetSubscriptionPlanUseCase
  ) {}

  async createSubscriptionPlan(
    httpRequest: HttpRequest
  ): Promise<HttpResponse> {
    const parsed = createPlanSchema.parse(httpRequest.body);

    const dto: CreateSubscriptionPlanDTO = {
      tier: parsed.tier,
      description: parsed.description,
      isPopular: parsed.isPopular ?? false,
      price: parsed.price,
      features: parsed.features,
    };

    const result = await this._createPlanUseCase.execute(dto);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.CREATED, response);
  }
  async getSubscriptionPlans(httpRequest: HttpRequest): Promise<HttpResponse> {
    const result = await this._getPlanUseCase.execute();
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
