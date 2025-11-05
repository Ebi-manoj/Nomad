import {
  VerifyDocResponseDTO,
  VerifyDocsRequestDTO,
} from '../../../domain/dto/DocumentsDTO';

export interface IVerifyDocumentUseCase {
  execute(data: VerifyDocsRequestDTO): Promise<VerifyDocResponseDTO>;
}
