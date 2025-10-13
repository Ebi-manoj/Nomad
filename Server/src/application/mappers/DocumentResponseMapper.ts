import {
  DocumentsWithUserDTO,
  uploadDocResponseDTO,
} from '../../domain/dto/DocumentsDTO';
import { Document } from '../../domain/entities/Document';

export function documentMapper(document: Document): uploadDocResponseDTO {
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

export function documentWithUserMapper(doc: any): DocumentsWithUserDTO {
  return {
    id: doc._id.toString(),
    type: doc.document_type,
    doc_number: doc.document_number,
    fileURL: doc.fileUrl,
    verified: doc.verified,
    status: doc.status,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    user: {
      id: doc.users?._id.toString() || doc.user_id.toString(),
      fullName: doc.users?.fullName || '',
    },
  };
}
