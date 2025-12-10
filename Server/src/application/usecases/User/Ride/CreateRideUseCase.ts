import { CreateRideDTO } from '../../../../domain/dto/RideDTO';
import { RideLog } from '../../../../domain/entities/Ride';
import { RideStatus } from '../../../../domain/enums/Ride';
import { UserNotFound } from '../../../../domain/errors/CustomError';
import { IGoogleApi } from '../../../providers/IGoogleApi';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { ISubscriptionValidator } from '../../../services/ISubscriptionValidator';
import { ICreateRideUseCase } from './ICreateRideUseCase';

export class CreateRideUseCase implements ICreateRideUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _googleApis: IGoogleApi,
    private readonly _rideRepository: IRideRepository,
    private readonly _subcriptionValidator: ISubscriptionValidator
  ) {}

  async execute(data: CreateRideDTO): Promise<RideLog> {
    await this._subcriptionValidator.validateCreateRide(
      data.costSharing,
      data.userId
    );
    const user = await this._userRepository.findById(data.userId);
    if (!user) throw new UserNotFound();
    const pickup = {
      lat: data.pickup.coordinates[0],
      lng: data.pickup.coordinates[1],
    };
    const destination = {
      lat: data.destination.coordinates[0],
      lng: data.destination.coordinates[1],
    };

    const { distance: totalDistance } = await this._googleApis.getDistance(
      pickup,
      destination
    );

    const route = await this._googleApis.getRoute(pickup, destination);

    const rideLog = new RideLog({
      ...data,
      route: { type: 'LineString', coordinates: route },
      totalDistance,
      hikersMatched: [],
      status: RideStatus.ACTIVE,
    });
    const savedRide = await this._rideRepository.create(rideLog);
    return savedRide;
  }
}
