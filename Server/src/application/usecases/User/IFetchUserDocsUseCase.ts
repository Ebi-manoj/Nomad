import { DocResponseDTO } from '../../../domain/dto/DocumentsDTO';

export interface IFetchUserDocsUseCase {
  execute(userId: string): Promise<DocResponseDTO[] | []>;
}
