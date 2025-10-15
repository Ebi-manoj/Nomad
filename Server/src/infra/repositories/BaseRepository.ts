import { Model, Document } from 'mongoose';
import { IBaseRepository } from '../../application/repositories/IBaseRepository';
import { IMapper } from '../mappers/IMapper';

export abstract class MongoBaseRepository<TDomain, TModel>
  implements IBaseRepository<TDomain>
{
  protected model: Model<TModel>;
  protected mapper: IMapper<TDomain, TModel>;

  constructor(model: Model<TModel>, mapper: IMapper<TDomain, TModel>) {
    this.model = model;
    this.mapper = mapper;
  }

  async create(data: any): Promise<TDomain> {
    const toSave = this.mapper.toPersistence(data);
    const created = await this.model.create(toSave);
    return this.mapper.toDomain(created);
  }

  async findById(id: string): Promise<TDomain | null> {
    const found = await this.model.findById(id);
    return found ? this.mapper.toDomain(found) : null;
  }

  async update(id: string, data: Partial<TDomain>): Promise<TDomain | null> {
    const updated = await this.model.findById(id);
    if (!updated) return null;
    Object.assign(updated, data);
    return this.mapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}
