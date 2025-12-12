import { IPresignedUrlService } from '../../../application/services/IPresignedUrlService';
import { FOLDER_NAMES } from '../../../domain/enums/Constants';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { ApiResponse } from '../helpers/implementation/apiResponse';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IGetPresignedURLController } from './IGetPresignedUrlController';

export class PresignedUrlController implements IGetPresignedURLController {
  constructor(private readonly _presignedUrlService: IPresignedUrlService) {}

  async getPresignedUrl(httpRequest: HttpRequest): Promise<HttpResponse> {
    const data = httpRequest.body as {
      fileName: string;
      fileType: string;
      type: FOLDER_NAMES;
    };
    const result = await this._presignedUrlService.getUploadUrl(data);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
  async getViewPresignedUrl(httpRequest: HttpRequest): Promise<HttpResponse> {
    const data = httpRequest.body as { fileURL: string };
    const result = await this._presignedUrlService.getViewUrl(data);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
