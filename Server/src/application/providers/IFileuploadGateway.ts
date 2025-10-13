import {
  presignedURLRequestDTO,
  presignURLResponseDTO,
} from '../../domain/dto/DocumentsDTO';

export interface IFileuploadGateway {
  getPresignedURL(data: presignedURLRequestDTO): Promise<presignURLResponseDTO>;
  getImageBuffer(url: string): Promise<Buffer | undefined>;
}
