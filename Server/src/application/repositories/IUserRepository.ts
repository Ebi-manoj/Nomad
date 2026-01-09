import { User } from '../../domain/entities/User';
import { IBaseRepository } from './IBaseRepository';

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findByMobile(mobile: string): Promise<User | null>;
  fetchUsers(
    limit: number,
    skip: number,
    search?: string,
    sort?: 'newest' | 'oldest'
  ): Promise<User[] | []>;
  countUsers(search?: string): Promise<number>;
}
