import {
  DocumentsWithUserDTO,
  FetchDocsQuery,
} from '../../../domain/dto/DocumentsDTO';

export interface IFetchAllDocsUseCase {
  execute(
    query: Partial<FetchDocsQuery> & { page: number }
  ): Promise<DocumentsWithUserDTO[] | []>;
}
