import {
  AdminRideResDTO,
  GetAdminRidesResDTO,
} from '../../../domain/dto/adminRidesDTO';
import { rideMapper } from '../../mappers/RideMapper';
import { userMapper } from '../../mappers/UserResponse.mapper';
import { IRideRepository } from '../../repositories/IRideRepository';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IGetAllRideUseCase } from './IGetAllRideUseCase';

export class GetAllRideUseCase implements IGetAllRideUseCase {
  constructor(
    private readonly rideRepository: IRideRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(page: number, status?: string): Promise<GetAdminRidesResDTO> {
    const LIMIT = 5;
    const skip = (page - 1) * LIMIT;

    const rides = await this.rideRepository.findAllRides(LIMIT, skip, status);
    const total = await this.rideRepository.countRides(status);

    const result = await Promise.all(
      rides.map(async r => {
        const user = await this.userRepository.findById(r.getRiderId());
        if (user) {
          return {
            ...rideMapper(r),
            user: userMapper(user),
          };
        }
      })
    );

    const response = result.filter(
      (r): r is AdminRideResDTO => r !== undefined
    );

    const rideMetrics = await this.rideRepository.getRideMetrics();

    return {
      total,
      rides: response,
      rideMetrics,
    };
  }
}
