import { User } from '../../domain/entities/User';
import { Email } from '../../domain/value-objects/email';
import { Mobile } from '../../domain/value-objects/mobile';
import { IUserModel } from '../database/user.model';
import { IMapper } from './IMapper';

export const userMapper: IMapper<User, IUserModel> = {
  toPersistence(domain: User): Partial<IUserModel> {
    return {
      fullName: domain.getFullName(),
      email: domain.getEmail(),
      mobile: domain.getMobile() ?? undefined,
      password: domain.getPassword() ?? undefined,
      role: domain.getRole(),
      isBlocked: domain.getIsBlocked(),
      aadhaarVerified: domain.getAadhaarVerified(),
      licenceVerified: domain.getLicenceVerified(),
    };
  },
  toDomain(userDoc: IUserModel): User {
    return new User({
      id: userDoc._id.toString(),
      fullName: userDoc.fullName,
      email: new Email(userDoc.email),
      mobile: userDoc.mobile ? new Mobile(userDoc.mobile) : undefined,
      password: userDoc.password,
      role: userDoc.role,
      isBlocked: userDoc.isBlocked,
      aadhaarVerified: userDoc.aadhaarVerified,
      licenceVerified: userDoc.licenceVerified,
      createdAt: userDoc.createdAt,
      updatedAt: userDoc.updatedAt,
    });
  },
};
