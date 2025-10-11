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

export class Document {
  private readonly id?: string;
  private readonly user_id: string;
  private readonly document_type: 'aadhaar' | 'license';
  private readonly document_number: string;
  private readonly verified: boolean;
  private readonly fileUrl: string;
  private readonly status: 'pending' | 'verified' | 'rejected';
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(props: DocumentProps) {
    this.id = props.id;
    this.user_id = props.user_id;
    this.document_type = props.document_type;
    this.document_number = props.document_number;
    this.fileUrl = props.fileUrl;
    this.status = props.status || 'pending';
    this.verified = props.verified ?? false;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }
  getId() {
    return this.id;
  }

  getUserId() {
    return this.user_id;
  }

  getDocumentType() {
    return this.document_type;
  }

  getDocumentNumber() {
    return this.document_number;
  }

  getFileUrl() {
    return this.fileUrl;
  }

  getStatus() {
    return this.status;
  }

  isVerified() {
    return this.verified;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }
}
