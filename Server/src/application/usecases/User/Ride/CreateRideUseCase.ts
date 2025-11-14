import { CreateRideDTO } from '../../../../domain/dto/RideDTO';
import { RideLog } from '../../../../domain/entities/Ride';
import { RideStatus } from '../../../../domain/enums/Ride';
import { UserNotFound } from '../../../../domain/errors/CustomError';
import { IGoogleApi } from '../../../providers/IGoogleApi';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { ICreateRideUseCase } from './ICreateRideUseCase';

export class CreateRideUseCase implements ICreateRideUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly googleApis: IGoogleApi,
    private readonly rideRepository: IRideRepository
  ) {}

  async execute(data: CreateRideDTO): Promise<RideLog> {
    const user = await this.userRepository.findById(data.userId);
    if (!user) throw new UserNotFound();
    const pickup = {
      lat: data.pickup.coordinates[0],
      lng: data.pickup.coordinates[1],
    };
    const destination = {
      lat: data.destination.coordinates[0],
      lng: data.destination.coordinates[1],
    };

    const { distance: totalDistance } = await this.googleApis.getDistance(
      pickup,
      destination
    );

    const route = await this.googleApis.getRoute(pickup, destination);

    const rideLog = new RideLog({
      ...data,
      route: { type: 'LineString', coordinates: route },
      totalDistance,
      hikersMatched: [],
      status: RideStatus.ACTIVE,
    });
    const savedRide = await this.rideRepository.create(rideLog);
    return savedRide;
  }
}
