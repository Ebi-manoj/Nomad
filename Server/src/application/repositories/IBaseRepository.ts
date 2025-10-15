export interface IBaseRepository<TDomain> {
  create(data: TDomain): Promise<TDomain>;
  findById(id: string): Promise<TDomain | null>;
  update(id: string, data: Partial<TDomain>): Promise<TDomain | null>;
  delete(id: string): Promise<void>;
}
