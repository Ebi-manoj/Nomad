import {
  uploadDocRequestDTO,
  DocResponseDTO,
} from '../../../domain/dto/DocumentsDTO';
import { Document } from '../../../domain/entities/Document';
import { DocumentStatus } from '../../../domain/enums/documentStatus';
import { UserNotFound } from '../../../domain/errors/CustomError';
import { DocumentNotFound } from '../../../domain/errors/DocumentError';
import { documentMapper } from '../../mappers/DocumentResponseMapper';
import { IDocumentRepository } from '../../repositories/IDocumentRepository';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IUploadDocumentUseCase } from './IUploadDocUseCase';

export class UploadDocumentUseCase implements IUploadDocumentUseCase {
  constructor(
    private readonly documentRepository: IDocumentRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(data: uploadDocRequestDTO): Promise<DocResponseDTO> {
    const { fileURL, userId, type, doc_number } = data;
    console.log(userId);
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UserNotFound();

    const existingDoc = await this.documentRepository.findOne({
      user_id: userId,
      document_type: type,
    });

    let newDoc: Document;

    if (!existingDoc) {
      const document = new Document({
        document_type: type,
        document_number: doc_number,
        fileUrl: fileURL,
        user_id: userId,
      });
      newDoc = await this.documentRepository.create(document);
    } else {
      existingDoc.setFileUrl(fileURL);
      existingDoc.setStatus(DocumentStatus.Pending);
      existingDoc.setDocumentNumber(doc_number);
      existingDoc.setCreatedAt(new Date());
      const updated = await this.documentRepository.updateOne(existingDoc);
      if (!updated) throw new DocumentNotFound();
      newDoc = updated;
    }

    return documentMapper(newDoc);
  }
}
