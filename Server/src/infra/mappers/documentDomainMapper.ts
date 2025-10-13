import { DocumentsWithUserDTO } from '../../domain/dto/DocumentsDTO';
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

export function documentWithUserMapper(doc: any): DocumentsWithUserDTO {
  return {
    id: doc._id.toString(),
    type: doc.document_type,
    doc_number: doc.document_number,
    fileURL: doc.fileUrl,
    verified: doc.verified,
    status: doc.status,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    user: {
      id: doc.users?._id.toString() || doc.user_id.toString(),
      fullName: doc.users?.fullName || '',
    },
  };
}
