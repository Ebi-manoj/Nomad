export type docType = 'aadhaar' | 'license';

export interface document {
  id: string;
  doc_number: string;
  type: docType;
  fileURL: string;
  userId: string;
  status: 'pending' | 'verified' | 'rejected';
  verified: boolean;
  createdAt: Date;
}

export interface DocState {
  loading: boolean;
  documents: document[];
}

export interface uploadDocsRequest {
  fileURL: string;
  type: docType;
  userId: string;
  doc_number: string;
}
