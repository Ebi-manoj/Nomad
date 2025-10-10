import { PresignedUrlService } from '../../../application/services/PresignedUrlServices';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IFileUploaderController } from './IFileuploaderController';

export class FileuploadController implements IFileUploaderController {
  constructor(private readonly presignedUrlService: PresignedUrlService) {}

  async getPresignedUrl(httpRequest: HttpRequest): Promise<HttpResponse> {
    const data = httpRequest.body as { fileName: string; fileType: string };

    const result = await this.presignedUrlService.execute(data);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
