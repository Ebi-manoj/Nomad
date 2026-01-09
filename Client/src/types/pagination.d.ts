export interface PaginationDTO {
  page: number;
  limit: number;
  search?: string;
  sort?: 'newest' | 'oldest';
}
