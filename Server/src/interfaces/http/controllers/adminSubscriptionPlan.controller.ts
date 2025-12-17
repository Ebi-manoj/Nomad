import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import {
  CreateSubscriptionPlanDTO,
  EditSubscriptionPlanDTO,
} from '../../../domain/dto/adminSubscription';
import { ApiResponse } from '../helpers/implementation/apiResponse';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { ICreateSubscriptionPlanUseCase } from '../../../application/usecases/Admin/ICreateSubscriptionPlan';
import { IAdminSubscriptionPlanController } from './IAdminSubscriptionPlanController';
import { subscriptionPlanSchema } from '../../validators/subscriptionPlan';
import { IGetSubscriptionPlanUseCase } from '../../../application/usecases/Admin/IGetSubscriptionPlans';
import { IEditSubscriptionPlanUseCase } from '../../../application/usecases/Admin/IEditSubscriptionPlan';

export class AdminSubscriptionPlanController
  implements IAdminSubscriptionPlanController
{
  constructor(
    private readonly _createPlanUseCase: ICreateSubscriptionPlanUseCase,
    private readonly _getPlanUseCase: IGetSubscriptionPlanUseCase,
    private readonly _editPlanUseCase: IEditSubscriptionPlanUseCase
  ) {}

  async createSubscriptionPlan(
    httpRequest: HttpRequest
  ): Promise<HttpResponse> {
    const parsed = subscriptionPlanSchema.parse(httpRequest.body);

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
  async editSubscriptionPlan(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { planId } = httpRequest.path as { planId: string };
    const parsed = subscriptionPlanSchema.parse(httpRequest.body);
    const dto: EditSubscriptionPlanDTO = {
      id: planId,
      tier: parsed.tier,
      description: parsed.description,
      isPopular: parsed.isPopular,
      price: parsed.price,
      features: parsed.features,
    };

    const result = await this._editPlanUseCase.execute(dto);
    const response = ApiResponse.success(result);

    return new HttpResponse(HttpStatus.OK, response);
  }
  async getSubscriptionPlans(httpRequest: HttpRequest): Promise<HttpResponse> {
    const result = await this._getPlanUseCase.execute();
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
