import { UserResponseDTO } from '../../domain/dto/authDTO';
import { uploadDocResponseDTO } from '../../domain/dto/fileuploadDTO';
import { Document } from '../../domain/entities/Document';
import { User } from '../../domain/entities/User';
export interface DocumentProps {
  id?: string;
  user_id: string;
  document_type: 'aadhaar' | 'license';
  document_number: string;
  fileUrl: string;
  verified?: boolean;
  status?: 'pending' | 'verified' | 'rejected';
  createdAt?: Date;
  updatedAt?: Date;
}
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
