import { User } from '../../domain/entities/User';
import { Email } from '../../domain/value-objects/email';
import { Mobile } from '../../domain/value-objects/mobile';
import { IUserModel } from '../database/user.model';

export function userDomainMapper(userDoc: IUserModel): User {
  return new User({
    id: userDoc._id.toString(),
    fullName: userDoc.fullName,
    email: new Email(userDoc.email),
    mobile: userDoc.mobile ? new Mobile(userDoc.mobile) : undefined,
    password: userDoc.password,
    role: userDoc.role,
    isBlocked: userDoc.isBlocked,
    createdAt: userDoc.createdAt,
    updatedAt: userDoc.updatedAt,
  });
}
