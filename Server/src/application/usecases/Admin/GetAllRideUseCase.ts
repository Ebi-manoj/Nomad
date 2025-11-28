import { GetRidesResDTO } from '../../../domain/dto/RideDTO';
import { rideMapper } from '../../mappers/RideMapper';
import { IRideRepository } from '../../repositories/IRideRepository';
import { IGetAllRideUseCase } from './IGetAllRideUseCase';

export class GetAllRideUseCase implements IGetAllRideUseCase {
  constructor(private readonly rideRepository: IRideRepository) {}

  async execute(page: number, status?: string): Promise<GetRidesResDTO> {
    const LIMIT = 10;
    const skip = (page - 1) * LIMIT;

    const rides = await this.rideRepository.findAllRides(LIMIT, skip, status);
    const total = await this.rideRepository.countRides(status);

    const ridesData = rides.map((r)=>rideMapper(r));

    return {
      total,
      rides: ridesData,
    };
  }
}
