import { FOLDER_NAMES } from '../enums/Constants';
import { Documents, DocumentStatus } from '../enums/documentStatus';

export interface presignedURLRequestDTO {
  fileName: string;
  fileType: string;
  type: FOLDER_NAMES;
}

export interface presignURLResponseDTO {
  uploadURL: string;
  fileURL: string;
}

export interface uploadDocRequestDTO {
  fileURL: string;
  type: Documents.Aadhaar | Documents.Licence;
  doc_number: string;
  userId: string;
}

export interface DocResponseDTO {
  id: string;
  userId: string;
  type: Documents.Aadhaar | Documents.Licence;
  doc_number: string;
  fileURL: string;
  verified: boolean;
  status: DocumentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface FetchDocsQuery {
  status?: string;
  type?: string;
  search?: string;
  limit: number;
  skip: number;
}

export interface DocumentsWithUserDTO {
  id: string;
  type: Documents.Aadhaar | Documents.Licence;
  doc_number: string;
  fileURL: string;
  verified: boolean;
  status: DocumentStatus;
  user: {
    id: string;
    fullName: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface VerifyDocsRequestDTO {
  document_id: string;
  status: DocumentStatus.Verified | DocumentStatus.Rejected;
}

export interface VerifyDocResponseDTO {
  id: string;
  doc_number: string;
  verified: boolean;
  status: DocumentStatus;
  updatedAt: Date;
}
