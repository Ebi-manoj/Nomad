import { UserResponseDTO } from '../../domain/dto/authDTO';
import { User } from '../../domain/entities/User';

export function userMapper(user: User): UserResponseDTO {
  return {
    id: user.getId()!,
    fullName: user.getFullName(),
    email: user.getEmail(),
    mobile: user.getMobile() || undefined,
    role: user.getRole(),
    isBlocked: user.getIsBlocked(),
    aadhaarVerified: user.getAadhaarVerified(),
    licenceVerified: user.getLicenceVerified(),
    createdAt: user.getCreatedAt(),
    updatedAt: user.getUpdatedAt(),
  };
}
