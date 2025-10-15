import { User } from '../../domain/entities/User';
import { IBaseRepository } from './IBaseRepository';

export interface UserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findByMobile(mobile: string): Promise<User | null>;
  updateUser(user: User): Promise<User | void>;
  fetchUsers(limit: number, skip: number, search?: string): Promise<User[]>;
  countUsers(search?: string): Promise<number>;
}
