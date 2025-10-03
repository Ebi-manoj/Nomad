import { UserRepository } from '../../application/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { Email } from '../../domain/value-objects/email';
import { Mobile } from '../../domain/value-objects/mobile';
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
  async updateUser(user: User): Promise<void> {
    const found = await UserModel.findById(user.getId());
    if (!found) return;
    found.password = user.getPassword() || found.password;
    await found.save();
  }
}
