import { Document } from '../../domain/entities/Document';

export interface IDocumentRepository {
  create(data: Document): Promise<Document>;
  findDocsByUserId(data: string): Promise<Document[] | []>;
}
