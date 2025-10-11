import { PresignedUrlService } from '../../../application/services/PresignedUrlServices';
import { PresignedUrlController } from '../../../interfaces/http/controllers/presignedUrl.controller';
import { IGetPresignedURLController } from '../../../interfaces/http/controllers/IGetPresignedUrlController';
import { S3Fileuploader } from '../../providers/fileUploader';
import { IUploadDocumentController } from '../../../interfaces/http/controllers/IUploadDocumentController';
import { UploadDocumentUseCase } from '../../../application/usecases/User/UploadDocumentsUseCase';
import { UploadDocumentController } from '../../../interfaces/http/controllers/uploadDocument.controller';
import { MongoUserRepository } from '../../repositories/UserRepository';
import { DocumentRepository } from '../../repositories/DocumentRepository';

export function presignedURLComposer(): IGetPresignedURLController {
  const fileUploaderGateway = new S3Fileuploader();
  const presignedUrlservice = new PresignedUrlService(fileUploaderGateway);

  return new PresignedUrlController(presignedUrlservice);
}

export function uploadDocumentComposer(): IUploadDocumentController {
  const userRepository = new MongoUserRepository();
  const documentRepository = new DocumentRepository();
  const uploadDocumentUseCase = new UploadDocumentUseCase(
    documentRepository,
    userRepository
  );

  return new UploadDocumentController(uploadDocumentUseCase);
}
