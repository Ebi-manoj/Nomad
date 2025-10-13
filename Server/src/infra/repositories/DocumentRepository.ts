import { IDocumentRepository } from '../../application/repositories/IDocumentRepository';
import {
  FetchDocsQuery,
  DocumentsWithUserDTO,
} from '../../domain/dto/DocumentsDTO';
import { Document } from '../../domain/entities/Document';
import { DocumentModel } from '../database/document.model';
import { documentDomainMapper } from '../mappers/documentDomainMapper';

export class DocumentRepository implements IDocumentRepository {
  async findById(id: string): Promise<Document | null> {
    const found = await DocumentModel.findById(id);
    if (!found) return null;
    return documentDomainMapper(found);
  }

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

  async updateOne(data: Document): Promise<Document | void> {
    const updated = await DocumentModel.findByIdAndUpdate(
      data.getId(),
      {
        verified: data.getVerifed(),
        status: data.getStatus(),
        fileUrl: data.getFileUrl(),
      },
      { new: true }
    );
    if (!updated) return;
    return documentDomainMapper(updated);
  }

  async findDocsByUserId(data: string): Promise<Document[] | []> {
    const userDocs = await DocumentModel.find({ user_id: data });
    return userDocs.map(docs => documentDomainMapper(docs));
  }

  async findDocs(data: FetchDocsQuery): Promise<DocumentsWithUserDTO[] | []> {
    const { status, limit, search, skip, type } = data;
    console.log(status);
    const docs = await DocumentModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'users',
        },
      },
      { $unwind: '$users' },

      ...(search
        ? [
            {
              $match: {
                $or: [
                  { 'users.fullName': { $regex: search, $options: 'i' } },
                  { document_number: { $regex: search, $options: 'i' } },
                ],
              },
            },
          ]
        : []),
      ...(status ? [{ $match: { status } }] : []),
      ...(type ? [{ $match: { document_type: type } }] : []),
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);
    return docs;
  }
}
