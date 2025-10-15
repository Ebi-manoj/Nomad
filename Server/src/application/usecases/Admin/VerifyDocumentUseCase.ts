import {
  VerifyDocResponseDTO,
  VerifyDocsRequestDTO,
} from '../../../domain/dto/DocumentsDTO';
import { DocumentStatus } from '../../../domain/enums/documentStatus';
import { UserNotFound } from '../../../domain/errors/CustomError';
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

    if (data.status == DocumentStatus.Verified) {
      const user = await this.userRepository.findById(document.getUserId());
      if (!user) throw new UserNotFound();
      document.getDocumentType() == 'aadhaar' && user.setAadhaarVerified(true);
      document.getDocumentType() == 'licence' && user.setLicenceVerified(true);
      await this.userRepository.update(user.getId(), user);
      document.setVerified(true);
    }
    const updatedDoc = await this.documentRepository.updateOne(document);
    if (!updatedDoc) throw new DocumentNotFound();
    return documentMapper(updatedDoc);
  }
}
