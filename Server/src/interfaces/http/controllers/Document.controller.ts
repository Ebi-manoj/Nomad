import { IFileuploadGateway } from '../../../application/providers/IFileuploadGateway';
import { FetchAllDocsUseCase } from '../../../application/usecases/Admin/FetchAllDocsUseCase';
import { IFetchAllDocsUseCase } from '../../../application/usecases/Admin/IFetchAllDocsUseCase';
import { IVerifyDocumentUseCase } from '../../../application/usecases/Admin/IVerifyDocumentUseCase';
import { VerifyDocumentUseCase } from '../../../application/usecases/Admin/VerifyDocumentUseCase';
import { FetchUserDocsUseCase } from '../../../application/usecases/User/FetchUserDocsUseCase';
import { IFetchUserDocsUseCase } from '../../../application/usecases/User/IFetchUserDocsUseCase';
import { IUploadDocumentUseCase } from '../../../application/usecases/User/IUploadDocUseCase';
import { UploadDocumentUseCase } from '../../../application/usecases/User/UploadDocumentsUseCase';
import { VerifyDocsRequestDTO } from '../../../domain/dto/DocumentsDTO';
import { DocumentStatus } from '../../../domain/enums/documentStatus';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { uploadDocSchema } from '../../validators/uploadFileValidator';
import { ApiDTO } from '../helpers/implementation/apiDTO';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IDocumentController } from './IDocumentController';

export class DocumentController implements IDocumentController {
  constructor(
    private readonly uploadDocumentUseCase: IUploadDocumentUseCase,
    private readonly fetchUserDocsUseCase: IFetchUserDocsUseCase,
    private readonly fetchAllDocsUseCase: IFetchAllDocsUseCase,
    private readonly verifyDocumentUseCase: IVerifyDocumentUseCase
  ) {}
  async uploadDocument(httpRequest: HttpRequest): Promise<HttpResponse> {
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

  async findAllDocuments(httpRequest: HttpRequest): Promise<HttpResponse> {
    const parsed = httpRequest.query as Record<string, unknown>;
    const page = Number(parsed.page) || 1;
    const limit = Number(parsed.limit) || 5;
    const search = parsed.search as string | undefined;
    const status = parsed.status as string | undefined;
    const type = parsed.type as string | undefined;

    const dto = { page, limit, search, status, type };
    const result = await this.fetchAllDocsUseCase.execute(dto);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async veirfyDocument(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto: VerifyDocsRequestDTO = httpRequest.body as {
      document_id: string;
      status: DocumentStatus.Verified | DocumentStatus.Rejected;
    };
    const result = await this.verifyDocumentUseCase.execute(dto);
    const response = ApiDTO.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
