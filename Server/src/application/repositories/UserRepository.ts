import { User } from '../../domain/entities/User';

export interface UserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByMobile(mobile: string): Promise<User | null>;
  updateUser(user: User): Promise<User | void>;
  fetchUsers(
    limit: number,
    skip: number,
    search?: string
  ): Promise<User[] | []>;
  countUsers(search?: string): Promise<number>;
}
