import {
  presignedURLRequestDTO,
  presignURLResponseDTO,
} from '../../domain/dto/DocumentsDTO';

export interface IFileuploadGateway {
  getPresignedURL(data: presignedURLRequestDTO): Promise<presignURLResponseDTO>;
  getViewPresignedUrl(data: string): Promise<string>;
}
