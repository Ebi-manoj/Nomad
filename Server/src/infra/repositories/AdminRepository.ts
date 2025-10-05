import { IAdminRepository } from '../../application/repositories/IAdminRepostiory';
import { Admin } from '../../domain/entities/Admin';
import { AdminModel } from '../database/admin.model';
import { adminDomainMapper } from '../mappers/adminDomainMapper';

export class AdminRepository implements IAdminRepository {
  async create(admin: Admin): Promise<Admin> {
    const created = await AdminModel.create({
      email: admin.getEmail(),
      password: admin.getPassword(),
    });
    return adminDomainMapper(created);
  }
  async findByEmail(email: string): Promise<Admin | null> {
    const found = await AdminModel.findOne({ email });
    if (!found) return null;
    return adminDomainMapper(found);
  }
}
