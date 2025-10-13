import {
  DocumentsWithUserDTO,
  VerifyDocResponseDTO,
  VerifyDocsRequestDTO,
} from '../../../domain/dto/DocumentsDTO';
import { DocumentNotFound } from '../../../domain/errors/DocumentError';
import { documentMapper } from '../../mappers/DocumentResponseMapper';
import { IDocumentRepository } from '../../repositories/IDocumentRepository';
import { UserRepository } from '../../repositories/UserRepository';

export class VerifyDocumentUseCase {
  constructor(
    private readonly documentRepository: IDocumentRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(data: VerifyDocsRequestDTO): Promise<VerifyDocResponseDTO> {
    const document = await this.documentRepository.findById(data.document_id);
    if (!document) throw new DocumentNotFound();
    document.setStatus(data.status);
    if (data.status == 'verified') {
      document.setVerified(true);
    }
    const updatedDoc = await this.documentRepository.updateOne(document);
    if (!updatedDoc) throw new DocumentNotFound();
    return documentMapper(updatedDoc);
  }
}
