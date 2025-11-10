export interface IBaseRepository<TDomain, TSession = unknown> {
  create(data: TDomain): Promise<TDomain>;
  findById(id: string): Promise<TDomain | null>;
  update(
    id: string | undefined,
    data: Partial<TDomain>
  ): Promise<TDomain | null>;
  delete(id: string): Promise<void>;
  setSession(session: TSession | null): void;
}
