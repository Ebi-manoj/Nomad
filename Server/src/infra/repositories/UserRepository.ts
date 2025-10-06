import { UserRepository } from '../../application/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { UserModel } from '../database/user.model';
import { userDomainMapper } from '../mappers/userDomainMapper';

export class MongoUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const created = await UserModel.create({
      fullName: user.getFullName(),
      email: user.getEmail(),
      mobile: user.getMobile(),
      password: user.getPassword(),
    });

    return userDomainMapper(created);
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
