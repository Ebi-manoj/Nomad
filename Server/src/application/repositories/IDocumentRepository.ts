import {
  DocumentsWithUserDTO,
  FetchDocsQuery,
} from '../../domain/dto/DocumentsDTO';
import { Document } from '../../domain/entities/Document';

export interface IDocumentRepository {
  findById(id: string): Promise<Document | null>;
  create(data: Document): Promise<Document>;
  findDocsByUserId(data: string): Promise<Document[] | []>;
  findDocs(data: FetchDocsQuery): Promise<DocumentsWithUserDTO[] | []>;
  updateOne(data: Document): Promise<Document | void>;
}
