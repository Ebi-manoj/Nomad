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
  private readonly _id?: string;
  private readonly _user_id: string;
  private readonly _document_type: Documents.Aadhaar | Documents.Licence;
  private _document_number: string;
  private _verified: boolean;
  private _fileUrl: string;
  private _status: DocumentStatus;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: DocumentProps) {
    this._id = props.id;
    this._user_id = props.user_id;
    this._document_type = props.document_type;
    this._document_number = props.document_number;
    this._fileUrl = props.fileUrl;
    this._status = props.status || DocumentStatus.Pending;
    this._verified = props.verified ?? false;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }
  getId() {
    return this._id;
  }

  getUserId() {
    return this._user_id;
  }

  getDocumentType() {
    return this._document_type;
  }

  getDocumentNumber() {
    return this._document_number;
  }

  getFileUrl() {
    return this._fileUrl;
  }

  getStatus() {
    return this._status;
  }

  isVerified() {
    return this._verified;
  }

  getCreatedAt() {
    return this._createdAt;
  }
  getVerifed() {
    return this._verified;
  }

  getUpdatedAt() {
    return this._updatedAt;
  }
  setStatus(status: DocumentStatus) {
    this._status = status;
  }
  setVerified(data: boolean) {
    this._verified = data;
  }
  setFileUrl(url: string) {
    this._fileUrl = url;
  }
  setDocumentNumber(num: string) {
    this._document_number = num;
  }
  setCreatedAt(date: Date) {
    this._createdAt = date;
  }
}
