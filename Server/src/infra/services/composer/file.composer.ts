import { PresignedUrlService } from '../../../application/services/PresignedUrlServices';
import { PresignedUrlController } from '../../../interfaces/http/controllers/presignedUrl.controller';
import { IGetPresignedURLController } from '../../../interfaces/http/controllers/IGetPresignedUrlController';
import { S3Fileuploader } from '../../providers/fileUploader';
import { IDocumentController } from '../../../interfaces/http/controllers/IDocumentController';
import { UploadDocumentUseCase } from '../../../application/usecases/User/UploadDocumentsUseCase';
import { DocumentController } from '../../../interfaces/http/controllers/Document.controller';
import { MongoUserRepository } from '../../repositories/UserRepository';
import { DocumentRepository } from '../../repositories/DocumentRepository';
import { FetchUserDocsUseCase } from '../../../application/usecases/User/FetchUserDocsUseCase';

export function presignedURLComposer(): IGetPresignedURLController {
  const fileUploaderGateway = new S3Fileuploader();
  const presignedUrlservice = new PresignedUrlService(fileUploaderGateway);

  return new PresignedUrlController(presignedUrlservice);
}

export function DocumentComposer(): IDocumentController {
  const userRepository = new MongoUserRepository();
  const documentRepository = new DocumentRepository();
  const uploadDocumentUseCase = new UploadDocumentUseCase(
    documentRepository,
    userRepository
  );

  const fetchUserDocsUseCase = new FetchUserDocsUseCase(documentRepository);

  return new DocumentController(uploadDocumentUseCase, fetchUserDocsUseCase);
}
