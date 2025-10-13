import {
  presignedURLRequestDTO,
  presignURLResponseDTO,
} from '../../domain/dto/DocumentsDTO';

export interface IPresignedUrlService {
  getUploadUrl(data: presignedURLRequestDTO): Promise<presignURLResponseDTO>;
  getViewUrl(data: { fileURL: string }): Promise<string>;
}
