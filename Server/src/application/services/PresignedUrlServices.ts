import {
  presignedURLRequestDTO,
  presignURLResponseDTO,
} from '../../domain/dto/DocumentsDTO';
import { allowedMimeTypes } from '../../domain/enums/Constants';
import { InvalidFileFormat } from '../../domain/errors/FileuploadErrors';
import { IFileuploadGateway } from '../providers/IFileuploadGateway';

export class PresignedUrlService {
  constructor(private readonly fileUploader: IFileuploadGateway) {}

  async execute(data: presignedURLRequestDTO): Promise<presignURLResponseDTO> {
    if (!allowedMimeTypes.includes(data.fileType))
      throw new InvalidFileFormat();
    const urls = this.fileUploader.getPresignedURL(data);
    return urls;
  }
}
