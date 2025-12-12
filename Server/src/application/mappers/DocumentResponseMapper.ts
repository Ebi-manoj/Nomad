import { DocResponseDTO } from '../../domain/dto/DocumentsDTO';
import { Document } from '../../domain/entities/Document';

export function documentMapper(document: Document): DocResponseDTO {
  return {
    id: document.getId()!,
    doc_number: document.getDocumentNumber(),
    type: document.getDocumentType(),
    fileURL: document.getFileUrl(),
    userId: document.getUserId(),
    status: document.getStatus(),
    verified: document.isVerified(),
    createdAt: document.getCreatedAt(),
    updatedAt: document.getUpdatedAt(),
  };
}
