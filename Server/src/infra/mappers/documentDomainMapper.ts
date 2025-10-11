import { Document } from '../../domain/entities/Document';
import { IDocumentModel } from '../database/document.model';

export function documentDomainMapper(documentDoc: IDocumentModel): Document {
  return new Document({
    id: documentDoc._id.toString(),
    document_number: documentDoc.document_number,
    document_type: documentDoc.document_type,
    fileUrl: documentDoc.fileUrl,
    status: documentDoc.status,
    verified: documentDoc.verified,
    user_id: documentDoc.user_id.toString(),
    createdAt: documentDoc.createdAt,
    updatedAt: documentDoc.updatedAt,
  });
}
