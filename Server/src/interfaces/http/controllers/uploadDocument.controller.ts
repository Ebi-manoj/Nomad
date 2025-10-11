import { UploadDocumentUseCase } from '../../../application/usecases/User/UploadDocumentsUseCase';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { uploadDocSchema } from '../../validators/uploadFileValidator';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IUploadDocumentController } from './IUploadDocumentController';

export class UploadDocumentController implements IUploadDocumentController {
  constructor(private readonly uploadDocument: UploadDocumentUseCase) {}
  async verifyDocument(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = uploadDocSchema.parse(httpRequest.body);
    const result = await this.uploadDocument.execute(dto);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
