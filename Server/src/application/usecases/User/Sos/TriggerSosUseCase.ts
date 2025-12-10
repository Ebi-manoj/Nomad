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
import { ISosNotifier } from '../../../services/ISosNotifier';

export class TriggerSosUseCase implements ITriggerSosUseCase {
  constructor(
    private readonly _rideBookingRepository: IRideBookingRepository,
    private readonly _sosService: ISosService,
    private readonly _sosNotifier: ISosNotifier
  ) {}

  async execute(data: TriggerSosReqDTO): Promise<SosLogResDTO> {
    const booking = await this._rideBookingRepository.findById(data.bookingId);
    if (!booking) throw new RideBookingNotFound();

    if (booking.getHikerId() !== data.userId) throw new Forbidden();

    this.validateBookingStatus(booking.getStatus());

    const log = await this._sosService.createSosLog({
      userId: data.userId,
      rideId: booking.getRideId(),
      bookingId: booking.getId()!,
      initiatedBy: SosInitiator.HIKER,
      location: data.location,
    });

    await this._sosNotifier.notify(log);
    return log;
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
