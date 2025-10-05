import { Admin } from '../../domain/entities/Admin';
import { Email } from '../../domain/value-objects/email';
import { IAdminModel } from '../database/admin.model';

export function adminDomainMapper(adminDoc: IAdminModel): Admin {
  return new Admin({
    id: adminDoc._id.toString(),
    email: new Email(adminDoc.email),
    password: adminDoc.password,
  });
}
