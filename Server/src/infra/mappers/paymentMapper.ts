import { Payment } from '../../domain/entities/Payment';
import { PaymentStatus } from '../../domain/enums/payment';
import { IPaymentDocument } from '../database/payment.model';
import { IMapper } from './IMapper';
import mongoose from 'mongoose';

export const PaymentMapper: IMapper<Payment, IPaymentDocument> = {
  toDomain(persistence: IPaymentDocument): Payment {
    return new Payment({
      id: persistence._id.toString(),
      joinRequestId: persistence.joinRequestId.toString(),
      hikerId: persistence.hikerId.toString(),
      riderId: persistence.riderId.toString(),
      amount: persistence.amount,
      platformFee: persistence.platformFee,
      status: persistence.status as PaymentStatus,
      paymentMethod: persistence.paymentMethod,
      transactionId: persistence.transactionId,
      expiresAt: persistence.expiresAt,
      createdAt: persistence.createdAt,
      updatedAt: persistence.updatedAt,
    });
  },

  toPersistence(domain: Payment): Partial<IPaymentDocument> {
    return {
      joinRequestId: new mongoose.Types.ObjectId(domain.getJoinRequestId()),
      hikerId: new mongoose.Types.ObjectId(domain.getHikerId()),
      riderId: new mongoose.Types.ObjectId(domain.getRiderId()),
      amount: domain.getAmount(),
      platformFee: domain.getPlatformFee(),
      status: domain.getStatus(),
      paymentMethod: domain.getPaymentMethod(),
      transactionId: domain.getTransactionId(),
      expiresAt: domain.getExpiresAt(),
    };
  },
};
