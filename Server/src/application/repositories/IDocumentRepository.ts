import {
  DocumentsWithUserDTO,
  FetchDocsQuery,
} from '../../domain/dto/DocumentsDTO';
import { Document } from '../../domain/entities/Document';

export interface IDocumentRepository {
  create(data: Document): Promise<Document>;
  findDocsByUserId(data: string): Promise<Document[] | []>;
  findDocs(data: FetchDocsQuery): Promise<DocumentsWithUserDTO[] | []>;
}
