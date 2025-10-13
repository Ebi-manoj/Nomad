import {
  uploadDocRequestDTO,
  uploadDocResponseDTO,
} from '../../../domain/dto/DocumentsDTO';
import { Document } from '../../../domain/entities/Document';
import { UserNotFound } from '../../../domain/errors/CustomError';
import { documentMapper } from '../../mappers/DocumentResponseMapper';
import { IFileuploadGateway } from '../../providers/IFileuploadGateway';
import { IDocumentRepository } from '../../repositories/IDocumentRepository';
import { UserRepository } from '../../repositories/UserRepository';

export class UploadDocumentUseCase {
  constructor(
    private readonly documentRepository: IDocumentRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(data: uploadDocRequestDTO): Promise<uploadDocResponseDTO> {
    const { fileURL, userId, type, doc_number } = data;
    console.log(userId);
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UserNotFound();
    const document = new Document({
      document_type: type,
      document_number: doc_number,
      fileUrl: fileURL,
      user_id: userId,
    });

    const savedDoc = await this.documentRepository.create(document);
    return documentMapper(savedDoc);
  }
}
