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
