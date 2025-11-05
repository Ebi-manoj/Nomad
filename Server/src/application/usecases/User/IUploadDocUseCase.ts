import {
  DocResponseDTO,
  uploadDocRequestDTO,
} from '../../../domain/dto/DocumentsDTO';

export interface IUploadDocumentUseCase {
  execute(data: uploadDocRequestDTO): Promise<DocResponseDTO>;
}
