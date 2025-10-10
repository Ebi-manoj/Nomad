import { PresignedUrlService } from '../../../application/services/PresignedUrlServices';
import { FileuploadController } from '../../../interfaces/http/controllers/Fileuploader.controller';
import { IFileUploaderController } from '../../../interfaces/http/controllers/IFileuploaderController';
import { S3Fileuploader } from '../../providers/fileUploader';

export function fileComposer(): IFileUploaderController {
  const fileUploaderGateway = new S3Fileuploader();
  const presignedUrlservice = new PresignedUrlService(fileUploaderGateway);

  return new FileuploadController(presignedUrlservice);
}
