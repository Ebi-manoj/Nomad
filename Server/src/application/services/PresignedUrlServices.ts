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

export class PresignedUrlService {
  constructor(private readonly fileUploader: IFileuploadGateway) {}

  async execute(data: presignedURLRequestDTO): Promise<presignURLResponseDTO> {
    console.log(data.type);
    if (!allowedMimeTypes.includes(data.fileType))
      throw new InvalidFileFormat();
    if (!IMAGE_FOLDERS.includes(data.type)) throw new InvalidFolderType();
    const urls = this.fileUploader.getPresignedURL(data);
    return urls;
  }
}
