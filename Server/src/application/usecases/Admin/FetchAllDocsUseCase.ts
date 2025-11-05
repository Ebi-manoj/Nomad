import {
  DocumentsWithUserDTO,
  FetchDocsQuery,
} from '../../../domain/dto/DocumentsDTO';
import { documentWithUserMapper } from '../../mappers/DocumentResponseMapper';
import { IDocumentRepository } from '../../repositories/IDocumentRepository';
import { IFetchAllDocsUseCase } from './IFetchAllDocsUseCase';

export class FetchAllDocsUseCase implements IFetchAllDocsUseCase {
  constructor(private readonly documentsRepository: IDocumentRepository) {}

  async execute(
    query: Partial<FetchDocsQuery> & { page: number }
  ): Promise<DocumentsWithUserDTO[] | []> {
    const { status, search, page, type, limit = 10 } = query;
    const skip = (page - 1) * limit;
    const documents = await this.documentsRepository.findDocs({
      status,
      search,
      limit,
      type,
      skip,
    });
    return documents.map(d => documentWithUserMapper(d));
  }
}
