import {
  presignedURLRequestDTO,
  presignURLResponseDTO,
} from '../../domain/dto/DocumentsDTO';
import { allowedMimeTypes, IMAGE_FOLDERS } from '../../domain/enums/Constants';
import {
  InvalidFileFormat,
  InvalidFolderType,
} from '../../domain/errors/FileuploadErrors';
import { IFileuploadGateway } from '../providers/IFileuploadGateway';
import { IPresignedUrlService } from './IPresignedUrlService';

export class PresignedUrlService implements IPresignedUrlService {
  constructor(private readonly _fileUploader: IFileuploadGateway) {}

  async getUploadUrl(
    data: presignedURLRequestDTO
  ): Promise<presignURLResponseDTO> {
    if (!allowedMimeTypes.includes(data.fileType))
      throw new InvalidFileFormat();
    if (!IMAGE_FOLDERS.includes(data.type)) throw new InvalidFolderType();
    const urls = this._fileUploader.getPresignedURL(data);
    return urls;
  }
  async getViewUrl(data: { fileURL: string }): Promise<string> {
    return this._fileUploader.getViewPresignedUrl(data.fileURL);
  }
}
