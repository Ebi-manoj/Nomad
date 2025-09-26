import { RegisterUserResponseDTO } from '../../domain/dto/authDTO';
import { User } from '../../domain/entities/User';

export function registerUserMapper(user: User): RegisterUserResponseDTO {
  return {
    id: user.getId()!,
    fullName: user.getFullName(),
    email: user.getEmail(),
    mobile: user.getMobile(),
    createdAt: user.getCreatedAt(),
    updateAdt: user.getUpdatedAt(),
  };
}
