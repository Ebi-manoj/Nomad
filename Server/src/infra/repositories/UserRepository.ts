import { UserRepository } from '../../application/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { IUserModel, UserModel } from '../database/user.model';
import { userDomainMapper, userMapper } from '../mappers/userDomainMapper';
import { MongoBaseRepository } from './BaseRepository';

export class MongoUserRepository
  extends MongoBaseRepository<User, IUserModel>
  implements UserRepository
{
  constructor() {
    super(UserModel, userMapper);
  }

  async findById(id: string): Promise<User | null> {
    const found = await UserModel.findById(id);
    if (!found) return null;
    return userDomainMapper(found);
  }
  async findByEmail(email: string): Promise<User | null> {
    const found = await UserModel.findOne({ email });
    if (!found) return null;
    return userDomainMapper(found);
  }

  async findByMobile(mobile: string): Promise<User | null> {
    const found = await UserModel.findOne({ mobile });
    if (!found) return null;
    return userDomainMapper(found);
  }
  async updateUser(user: User): Promise<User | void> {
    const found = await UserModel.findById(user.getId());
    if (!found) return;
    found.password = user.getPassword() || found.password;
    found.isBlocked = user.getIsBlocked();
    found.aadhaarVerified = user.getAadhaarVerified();
    found.licenceVerified = user.getLicenceVerified();
    await found.save();
    return userDomainMapper(found);
  }
  async fetchUsers(
    limit: number,
    skip: number,
    search?: string
  ): Promise<User[] | []> {
    const query: any = { role: { $ne: 'admin' } };
    if (search) {
      query.fullName = { $regex: search, $options: 'i' };
    }
    const users = await UserModel.find(query).skip(skip).limit(limit).lean();
    return users.map(userDoc => userDomainMapper(userDoc));
  }
  async countUsers(search?: string): Promise<number> {
    const query: any = { role: { $ne: 'admin' } };
    if (search) {
      query.fullName = { $regex: search, $options: 'i' };
    }
    return await UserModel.countDocuments(query);
  }
}
