import type {
  SosLogResDTO,
  TriggerSosReqDTO,
} from '../../../../domain/dto/SosDTO';
import { RideBookingStatus } from '../../../../domain/enums/RideBooking';
import { Forbidden } from '../../../../domain/errors/CustomError';
import { RideBookingNotFound } from '../../../../domain/errors/RideBookingError';
import { IRideBookingRepository } from '../../../repositories/IRideBooking';
import { ISosService } from '../../../services/ISosService';
import { ITriggerSosUseCase } from './ITriggerSosUseCase';
import { SosInitiator } from '../../../../domain/enums/SosInitiator';
import { NotValidStatusToTrigger } from '../../../../domain/errors/SosErrors';

export class TriggerSosUseCase implements ITriggerSosUseCase {
  constructor(
    private readonly rideBookingRepository: IRideBookingRepository,
    private readonly sosService: ISosService
  ) {}

  async execute(data: TriggerSosReqDTO): Promise<SosLogResDTO> {
    const booking = await this.rideBookingRepository.findById(data.bookingId);
    if (!booking) throw new RideBookingNotFound();

    if (booking.getHikerId() !== data.userId) throw new Forbidden();

    this.validateBookingStatus(booking.getStatus());

    return this.sosService.createSosLog({
      userId: data.userId,
      rideId: booking.getRideId(),
      bookingId: booking.getId()!,
      initiatedBy: SosInitiator.HIKER,
      location: data.location,
    });
  }

  private validateBookingStatus(status: RideBookingStatus): void {
    const validStatuses: RideBookingStatus[] = [
      RideBookingStatus.CONFIRMED,
      RideBookingStatus.PICKEDUP,
      RideBookingStatus.DROPPEDOFF,
    ];

    if (!validStatuses.includes(status)) {
      throw new NotValidStatusToTrigger();
    }
  }
}
