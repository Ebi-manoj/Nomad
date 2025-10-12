import { IDocumentRepository } from '../../application/repositories/IDocumentRepository';
import { Document } from '../../domain/entities/Document';
import { DocumentModel } from '../database/document.model';
import { documentDomainMapper } from '../mappers/documentDomainMapper';

export class DocumentRepository implements IDocumentRepository {
  async create(data: Document): Promise<Document> {
    const created = await DocumentModel.create({
      user_id: data.getUserId(),
      document_type: data.getDocumentType(),
      document_number: data.getDocumentNumber(),
      verified: false,
      status: data.getStatus() || 'pending',
      fileUrl: data.getFileUrl(),
    });

    return documentDomainMapper(created);
  }

  async findDocsByUserId(data: string): Promise<Document[] | []> {
    const userDocs = await DocumentModel.find({ user_id: data });
    return userDocs.map(docs => documentDomainMapper(docs));
  }
}
