import {
  DocumentsWithUserDTO,
  FetchDocsQuery,
} from '../../../domain/dto/DocumentsDTO';
import { documentWithUserMapper } from '../../mappers/DocumentResponseMapper';
import { IDocumentRepository } from '../../repositories/IDocumentRepository';

export class FetchAllDocsUseCase {
  constructor(private readonly documentsRepository: IDocumentRepository) {}

  async execute(
    query: Partial<FetchDocsQuery> & { page: number }
  ): Promise<DocumentsWithUserDTO[] | []> {
    const { status, search, page, limit = 10 } = query;
    const skip = (page - 1) * limit;
    const documents = await this.documentsRepository.findDocs({
      status,
      search,
      limit,
      skip,
    });
    return documents.map(d => documentWithUserMapper(d));
  }
}
