import { DocResponseDTO } from '../../../domain/dto/DocumentsDTO';
import { documentMapper } from '../../mappers/DocumentResponseMapper';
import { IDocumentRepository } from '../../repositories/IDocumentRepository';
import { IFetchUserDocsUseCase } from './IFetchUserDocsUseCase';

export class FetchUserDocsUseCase implements IFetchUserDocsUseCase {
  constructor(private readonly documentsRepository: IDocumentRepository) {}

  async execute(userId: string): Promise<DocResponseDTO[] | []> {
    const userDocs = await this.documentsRepository.findDocsByUserId(userId);
    console.log(userDocs);
    return userDocs.map(docs => documentMapper(docs));
  }
}
