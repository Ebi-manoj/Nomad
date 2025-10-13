import { uploadDocResponseDTO } from '../../../domain/dto/DocumentsDTO';
import { documentMapper } from '../../mappers/DocumentResponseMapper';
import { IDocumentRepository } from '../../repositories/IDocumentRepository';

export class FetchUserDocsUseCase {
  constructor(private readonly documentsRepository: IDocumentRepository) {}

  async execute(userId: string): Promise<uploadDocResponseDTO[] | []> {
    const userDocs = await this.documentsRepository.findDocsByUserId(userId);
    console.log(userDocs);
    return userDocs.map(docs => documentMapper(docs));
  }
}
