export interface presignedURLRequestDTO {
  fileName: string;
  fileType: string;
}

export interface presignURLResponseDTO {
  uploadURL: string;
  fileURL: string;
}

export interface uploadDocRequestDTO {
  fileURL: string;
  type: 'aadhaar' | 'license';
  doc_number: string;
  userId: string;
}

export interface uploadDocResponseDTO {
  id: string;
  userId: string;
  type: 'aadhaar' | 'license';
  doc_number: string;
  fileURL: string;
  verified: boolean;
  status: 'pending' | 'verified' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface FetchDocsQuery {
  status?: string;
  search?: string;
  limit: number;
  skip: number;
}

export interface DocumentsWithUserDTO {
  id: string;
  type: 'aadhaar' | 'license';
  doc_number: string;
  fileURL: string;
  verified: boolean;
  status: 'pending' | 'verified' | 'rejected';
  user: {
    id: string;
    fullName: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
