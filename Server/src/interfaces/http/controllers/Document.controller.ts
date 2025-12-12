import { IFetchAllDocsUseCase } from '../../../application/usecases/Admin/IFetchAllDocsUseCase';
import { IVerifyDocumentUseCase } from '../../../application/usecases/Admin/IVerifyDocumentUseCase';
import { IFetchUserDocsUseCase } from '../../../application/usecases/User/IFetchUserDocsUseCase';
import { IUploadDocumentUseCase } from '../../../application/usecases/User/IUploadDocUseCase';
import { VerifyDocsRequestDTO } from '../../../domain/dto/DocumentsDTO';
import { DocumentStatus } from '../../../domain/enums/documentStatus';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { Unauthorized } from '../../../domain/errors/CustomError';
import { uploadDocSchema } from '../../validators/uploadFileValidator';
import { ApiResponse } from '../helpers/implementation/apiResponse';
import { HttpRequest } from '../helpers/implementation/httpRequest';
import { HttpResponse } from '../helpers/implementation/httpResponse';
import { IDocumentController } from './IDocumentController';

export class DocumentController implements IDocumentController {
  constructor(
    private readonly _uploadDocumentUseCase: IUploadDocumentUseCase,
    private readonly _fetchUserDocsUseCase: IFetchUserDocsUseCase,
    private readonly _fetchAllDocsUseCase: IFetchAllDocsUseCase,
    private readonly _verifyDocumentUseCase: IVerifyDocumentUseCase
  ) {}
  async uploadDocument(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = uploadDocSchema.parse(httpRequest.body);
    const result = await this._uploadDocumentUseCase.execute(dto);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async findUserDocuments(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto = httpRequest.user?.id;
    if (!dto) throw new Unauthorized();
    console.log(dto);
    const result = await this._fetchUserDocsUseCase.execute(dto);
    const response = ApiResponse.success(result);
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
    const result = await this._fetchAllDocsUseCase.execute(dto);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }

  async veirfyDocument(httpRequest: HttpRequest): Promise<HttpResponse> {
    const dto: VerifyDocsRequestDTO = httpRequest.body as {
      document_id: string;
      status: DocumentStatus.Verified | DocumentStatus.Rejected;
    };
    const result = await this._verifyDocumentUseCase.execute(dto);
    const response = ApiResponse.success(result);
    return new HttpResponse(HttpStatus.OK, response);
  }
}
