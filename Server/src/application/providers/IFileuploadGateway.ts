import {
  presignedURLRequestDTO,
  presignURLResponseDTO,
} from '../../domain/dto/fileuploadDTO';

export interface IFileuploadGateway {
  getPresignedURL(data: presignedURLRequestDTO): Promise<presignURLResponseDTO>;
}
