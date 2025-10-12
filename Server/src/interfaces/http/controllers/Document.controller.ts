import { FetchUserDocsUseCase } from '../../../application/usecases/User/FetchUserDocsUseCase';
import { UploadDocumentUseCase } from '../../../application/usecases/User/UploadDocumentsUseCase';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { uploadDocSchema } from '../../validators/uploadFileValidator';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IDocumentController } from './IDocumentController';

export class DocumentController implements IDocumentController {
  constructor(
    private readonly uploadDocumentUseCase: UploadDocumentUseCase,
    private readonly fetchUserDocsUseCase: FetchUserDocsUseCase
  ) {}
  async verifyDocument(httpRequest: HttpRequest): Promise<HttpResponse> {
    console.log('Reached upload Doc controller');

    const dto = uploadDocSchema.parse(httpRequest.body);
    const result = await this.uploadDocumentUseCase.execute(dto);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async findUserDocuments(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = httpRequest.user?.id!;
    console.log(dto);
    const result = await this.fetchUserDocsUseCase.execute(dto);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
