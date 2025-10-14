import { Documents, DocumentStatus } from '../enums/documentStatus';

export interface DocumentProps {
  id?: string;
  user_id: string;
  document_type: Documents.Aadhaar | Documents.Licence;
  document_number: string;
  fileUrl: string;
  verified?: boolean;
  status?: DocumentStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Document {
  private readonly id?: string;
  private readonly user_id: string;
  private readonly document_type: Documents.Aadhaar | Documents.Licence;
  private document_number: string;
  private verified: boolean;
  private fileUrl: string;
  private status: DocumentStatus;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(props: DocumentProps) {
    this.id = props.id;
    this.user_id = props.user_id;
    this.document_type = props.document_type;
    this.document_number = props.document_number;
    this.fileUrl = props.fileUrl;
    this.status = props.status || DocumentStatus.Pending;
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
  getVerifed() {
    return this.verified;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }
  setStatus(status: DocumentStatus) {
    this.status = status;
  }
  setVerified(data: boolean) {
    this.verified = data;
  }
  setFileUrl(url: string) {
    this.fileUrl = url;
  }
  setDocumentNumber(num: string) {
    this.document_number = num;
  }
  setCreatedAt(date: Date) {
    this.createdAt = date;
  }
}
