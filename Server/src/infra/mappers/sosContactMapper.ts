import { Types } from 'mongoose';
import { SosContact } from '../../domain/entities/SosContact';
import { ISosContactModel } from '../database/sosContact.model';
import { IMapper } from './IMapper';

export const sosContactMapper: IMapper<SosContact, ISosContactModel> = {
  toPersistence(domain: SosContact): Partial<ISosContactModel> {
    return {
      userId: new Types.ObjectId(domain.getUserId()),
      name: domain.getName(),
      phone: domain.getPhone(),
      relation: domain.getRelation(),
      createdAt: domain.getCreatedAt(),
      updatedAt: domain.getUpdatedAt(),
    };
  },

  toDomain(doc: ISosContactModel): SosContact {
    return new SosContact({
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      name: doc.name,
      phone: doc.phone,
      relation: doc.relation ?? undefined,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  },
};
