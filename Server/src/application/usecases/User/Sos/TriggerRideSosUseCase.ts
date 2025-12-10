import type {
  SosLogResDTO,
  TriggerRideSosReqDTO,
} from '../../../../domain/dto/SosDTO';
import { RideStatus } from '../../../../domain/enums/Ride';
import { Forbidden } from '../../../../domain/errors/CustomError';
import { RideNotFound } from '../../../../domain/errors/RideErrors';
import { SosInitiator } from '../../../../domain/enums/SosInitiator';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { ISosService } from '../../../services/ISosService';
import { ITriggerRideSosUseCase } from './ITriggerRideSosUseCase';
import { NotValidStatusToTrigger } from '../../../../domain/errors/SosErrors';
import { ISosNotifier } from '../../../services/ISosNotifier';

export class TriggerRideSosUseCase implements ITriggerRideSosUseCase {
  constructor(
    private readonly rideRepository: IRideRepository,
    private readonly sosService: ISosService,
    private readonly sosNotifier: ISosNotifier
  ) {}

  async execute(data: TriggerRideSosReqDTO): Promise<SosLogResDTO> {
    const ride = await this.rideRepository.findById(data.rideId);
    if (!ride) throw new RideNotFound();

    if (ride.getRiderId() !== data.userId) throw new Forbidden();

    if (ride.getStatus() !== RideStatus.ACTIVE) {
      throw new NotValidStatusToTrigger();
    }

    console.log(data);

    const log = await this.sosService.createSosLog({
      userId: data.userId,
      rideId: ride.getRideId()!,
      initiatedBy: SosInitiator.RIDER,
      location: data.location,
    });

    await this.sosNotifier.notify(log);
    return log;
  }
}
