import { EndRideReqDTO, EndRideResDTO } from '../../../../domain/dto/RideDTO';
import { Forbidden, UpdateFailed } from '../../../../domain/errors/CustomError';
import { RideNotFound } from '../../../../domain/errors/RideErrors';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { IEndRideUseCase } from './IEndRideUseCase';

export class EndRideUseCase implements IEndRideUseCase {
  constructor(private readonly rideRepository: IRideRepository) {}
  async execute(data: EndRideReqDTO): Promise<EndRideResDTO> {
    const ride = await this.rideRepository.findById(data.rideId);
    if (!ride) throw new RideNotFound();

    if (ride.getRiderId() !== data.userId) throw new Forbidden();
    ride.complete();

    const updated = await this.rideRepository.update(ride.getRideId()!, ride);
    if (!updated) throw new UpdateFailed();
    return {
      rideId: updated.getRideId()!,
      status: updated.getStatus(),
    };
  }
}
