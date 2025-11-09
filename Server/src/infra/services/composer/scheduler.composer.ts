import { IScheduler } from '../../../application/services/IScheduler';
import { CleanupSeatsReservation } from '../../../application/usecases/CleanupSeatsReservation';
import { WinstonLogger } from '../../providers/winstonLogger';
import { JoinRequestRepository } from '../../repositories/JoinRequestReqpository';
import { PaymentRepository } from '../../repositories/PaymentRepository';
import { RideRepository } from '../../repositories/RideRepository';
import { NodeCronScheduler } from '../NodeCronScheduler';

export function startSchedules(): IScheduler {
  const paymentRepository = new PaymentRepository();
  const joinRequestRepository = new JoinRequestRepository();
  const rideRepository = new RideRepository();
  const logger = new WinstonLogger();

  const cleanupSeatsReservation = new CleanupSeatsReservation(
    paymentRepository,
    rideRepository,
    joinRequestRepository,
    logger
  );

  return new NodeCronScheduler(cleanupSeatsReservation);
}
