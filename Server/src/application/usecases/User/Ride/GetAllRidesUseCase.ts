import {
  GetRidesReqDTO,
  GetRidesResDTO,
  RideResponseDTO,
} from '../../../../domain/dto/RideDTO';
import { rideMapper } from '../../../mappers/RideMapper';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { IGetAllRidesUseCase } from './IGetAllRidesUseCase';

export class GetAllRidesUseCase implements IGetAllRidesUseCase {
  constructor(private readonly _rideRepository: IRideRepository) {}

  async execute(data: GetRidesReqDTO): Promise<GetRidesResDTO> {
    const limit = 10;
    const { page, userId, status } = data;
    const skip = (page - 1) * limit;

    const rides = await this._rideRepository.findUserRides(
      userId,
      skip,
      status
    );
    const totalCount = await this._rideRepository.findCountUserRides(
      userId,
      status
    );

    const ridesData: RideResponseDTO[] = rides.map(ride => rideMapper(ride));

    return {
      total: totalCount,
      rides: ridesData,
    };
  }
}
