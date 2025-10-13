import { PresignedUrlService } from '../../../application/services/PresignedUrlServices';
import { FOLDER_NAMES } from '../../../domain/enums/Constants';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IGetPresignedURLController } from './IGetPresignedUrlController';

export class PresignedUrlController implements IGetPresignedURLController {
  constructor(private readonly presignedUrlService: PresignedUrlService) {}

  async getPresignedUrl(httpRequest: HttpRequest): Promise<HttpResponse> {
    const data = httpRequest.body as {
      fileName: string;
      fileType: string;
      type: FOLDER_NAMES;
    };
    const result = await this.presignedUrlService.getUploadUrl(data);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
  async getViewPresignedUrl(httpRequest: HttpRequest): Promise<HttpResponse> {
    const data = httpRequest.body as { fileURL: string };
    const result = await this.presignedUrlService.getViewUrl(data);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
