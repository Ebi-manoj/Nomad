export type docType = 'aadhaar' | 'license';

export interface AdminDocument {
  id: string;
  doc_number: string;
  type: docType;
  fileURL: string;
  userId: string;
  user: {
    id: string;
    fullName: string;
  };
  status: 'pending' | 'verified' | 'rejected';
  verified: boolean;
  createdAt: string;
}

export interface AdminDocState {
  loading: boolean;
  documents: AdminDocument[];
}

export interface fetchAllDocsQuery {
  page: number;
  status?: string;
  search?: string;
  limit?: string;
}
