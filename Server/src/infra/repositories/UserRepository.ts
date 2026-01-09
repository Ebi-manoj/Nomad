import { IUserRepository } from '../../application/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { IUserModel, UserModel } from '../database/user.model';
import { userMapper } from '../mappers/userDomainMapper';
import { FilterQuery } from 'mongoose';
import { MongoBaseRepository } from './BaseRepository';

type UserQuery = FilterQuery<IUserModel>;

export class MongoUserRepository
  extends MongoBaseRepository<User, IUserModel>
  implements IUserRepository
{
  constructor() {
    super(UserModel, userMapper);
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await UserModel.findOne({ email });
    if (!found) return null;
    return userMapper.toDomain(found);
  }

  async findByMobile(mobile: string): Promise<User | null> {
    const found = await UserModel.findOne({ mobile });
    if (!found) return null;
    return userMapper.toDomain(found);
  }

  async fetchUsers(
    limit: number,
    skip: number,
    search?: string,
    sort?: 'newest' | 'oldest'
  ): Promise<User[] | []> {
    const query: UserQuery = { role: { $ne: 'admin' } };
    if (search) {
      query.fullName = { $regex: search, $options: 'i' };
    }
    const users = await UserModel.find(query)
      .sort({ createdAt: sort === 'oldest' ? 1 : -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    return users.map(userDoc => userMapper.toDomain(userDoc));
  }
  async countUsers(search?: string): Promise<number> {
    const query: UserQuery = { role: { $ne: 'admin' } };
    if (search) {
      query.fullName = { $regex: search, $options: 'i' };
    }
    return await UserModel.countDocuments(query);
  }
}
