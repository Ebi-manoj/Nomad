import { uploadDocResponseDTO } from '../../../domain/dto/fileuploadDTO';
import { documentMapper } from '../../mappers/DocumentResponseMapper';
import { IDocumentRepository } from '../../repositories/IDocumentRepository';

export class FetchUserDocsUseCase {
  constructor(private readonly documentsRepository: IDocumentRepository) {}

  async execute(userId: string): Promise<uploadDocResponseDTO[] | []> {
    const userDocs = await this.documentsRepository.findDocsByUserId(userId);
    return userDocs.map(docs => documentMapper(docs));
  }
}
