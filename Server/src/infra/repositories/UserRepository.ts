import { UserRepository } from '../../application/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { Email } from '../../domain/value-objects/email';
import { Mobile } from '../../domain/value-objects/mobile';
import { UserModel } from '../database/user.model';

export class MongoUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const created = await UserModel.create({
      fullName: user.getFullName(),
      email: user.getEmail(),
      mobile: user.getMobile(),
      password: user.getPassword(),
    });

    return new User({
      id: created._id.toString(),
      fullName: created.fullName,
      email: new Email(created.email),
      mobile: new Mobile(created.mobile),
      password: created.password,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await UserModel.findOne({ email });
    if (!found) return null;
    return new User({
      id: found._id.toString(),
      fullName: found.email,
      email: new Email(found.email),
      mobile: new Mobile(found.mobile),
      password: found.password,
      createdAt: found.createdAt,
      updatedAt: found.updatedAt,
    });
  }

  async findByMobile(mobile: string): Promise<User | null> {
    const found = await UserModel.findOne({ mobile });
    if (!found) return null;
    return new User({
      id: found._id.toString(),
      fullName: found.fullName,
      email: new Email(found.email),
      mobile: new Mobile(found.mobile),
      password: found.password,
      createdAt: found.createdAt,
      updatedAt: found.updatedAt,
    });
  }
}
