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
      rating: domain.getRating(),
      ratingCount: domain.getRatingCount(),
      safetyScore: domain.getSafetyScore(),
      safetyScoreCount: domain.getSafetyScoreCount(),
      payoutContactId: domain.getPayoutContactId(),
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
      rating: userDoc.rating,
      ratingCount: userDoc.ratingCount,
      safetyScore: userDoc.safetyScore,
      safetyScoreCount: userDoc.safetyScoreCount,
      aadhaarVerified: userDoc.aadhaarVerified,
      licenceVerified: userDoc.licenceVerified,
      payoutContactId: userDoc.payoutContactId,
      createdAt: userDoc.createdAt,
      updatedAt: userDoc.updatedAt,
    });
  },
};
