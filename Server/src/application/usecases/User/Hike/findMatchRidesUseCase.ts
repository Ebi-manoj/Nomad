import { RideMatchResponseDTO } from '../../../../domain/dto/RideMatch';
import { IGeoService } from '../../../providers/IGeoService';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { IJoinRequestRepository } from '../../../repositories/IJoinRequestsRepository';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { RideMatchService } from '../../../services/RideMatchService';

export class FindMatchRideUseCase {
  constructor(
    private readonly rideRepository: IRideRepository,
    private readonly rideMatchService: RideMatchService,
    private readonly geoService: IGeoService,
    private readonly hikeRepository: IHikeRepository,
    private readonly joinRequestRepository: IJoinRequestRepository
  ) {}

  async execute(hikeId: string): Promise<RideMatchResponseDTO[]> {
    const hikelog = await this.hikeRepository.findById(hikeId);
    if (!hikelog) return [];

    const pickup = hikelog.getPickup();
    const destination = hikelog.getDestination();
    const seatRequested = hikelog.getSeatsRequested();
    const hasHelmet = hikelog.getHasHelmet();

    const activeRiders = await this.rideRepository.findActiveNearbyRiders(
      pickup
    );

    const filteredRiders = activeRiders.filter(ride => {
      const vehicleType = ride.getVehicleType();
      const riderHashelmet = ride.getHasHelmet();
      const seatsAvailable = ride.getSeatsAvailable();

      if (seatRequested > seatsAvailable) return false;

      if (vehicleType == 'bike' && !riderHashelmet && !hasHelmet) return false;
      return true;
    });

    const JoinRequests = await this.joinRequestRepository.findByHikeId(hikeId);
    const matchedRiders = [];
    for (const ride of filteredRiders) {
      const match = await this.rideMatchService.evaluate(
        ride,
        { pickup, destination },
        this.geoService
      );
      // if (match) matchedRiders.push(match);
      if (match) {
        const request = JoinRequests.find(
          r => r.getRideId() === ride.getRideId()
        );
        matchedRiders.push({
          ...match,
          requestStatus: request ? request.getStatus() : null,
        });
      }
    }
    console.log(matchedRiders);

    return matchedRiders;
  }
}
