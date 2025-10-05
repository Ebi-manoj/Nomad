import { AdminResponseDTO } from '../../domain/dto/authDTO';
import { Admin } from '../../domain/entities/Admin';

export function adminMapper(admin: Admin): AdminResponseDTO {
  return {
    id: admin.getId()!,
    email: admin.getEmail(),
  };
}
