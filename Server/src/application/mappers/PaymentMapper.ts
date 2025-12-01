import { PaymentResponseDTO } from '../../domain/dto/paymentDTO';
import { Payment } from '../../domain/entities/Payment';

export class PaymentMapper {
  static toResponseDTO(payment: Payment): PaymentResponseDTO {
    return {
      id: payment.getId()!,
      joinRequestId: payment.getJoinRequestId(),
      hikerId: payment.getHikerId(),
      riderId: payment.getRiderId(),
      hikeId: payment.getHikeId(),
      rideId: payment.getRideId(),
      amount: payment.getAmount(),
      platformFee: payment.getPlatformFee(),
      status: payment.getStatus(),
      paymentMethod: payment.getPaymentMethod(),
      stripePaymentId: payment.getStripPaymentId(),
      expiresAt: payment.getExpiresAt(),
      createdAt: payment.getCreatedAt(),
      updatedAt: payment.getUpdatedAt(),
    };
  }
}
