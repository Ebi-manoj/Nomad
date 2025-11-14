import { RideMatchResponseDTO } from '../../../../domain/dto/RideMatch';
import { RideLog } from '../../../../domain/entities/Ride';
import { IGeoService } from '../../../providers/IGeoService';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { IJoinRequestRepository } from '../../../repositories/IJoinRequestsRepository';
import { IPaymentRepository } from '../../../repositories/IPaymentRepository';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { IRideMatchService } from '../../../services/IRideMatchService';
import { IFindMatchRideUseCase } from './IFindMatchRideUseCase';

export class FindMatchRideUseCase implements IFindMatchRideUseCase {
  constructor(
    private readonly rideRepository: IRideRepository,
    private readonly rideMatchService: IRideMatchService,
    private readonly geoService: IGeoService,
    private readonly hikeRepository: IHikeRepository,
    private readonly joinRequestRepository: IJoinRequestRepository,
    private readonly paymentRepository: IPaymentRepository
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

    const filteredRidersMap = new Map<string, RideLog>();

    for (const ride of activeRiders) {
      const vehicleType = ride.getVehicleType();
      const riderHashelmet = ride.getHasHelmet();
      const seatsAvailable = ride.getSeatsAvailable();

      if (seatRequested > seatsAvailable) continue;
      if (vehicleType === 'bike' && !riderHashelmet && !hasHelmet) continue;

      filteredRidersMap.set(ride.getRideId()!, ride);
    }

    const JoinRequests = await this.joinRequestRepository.findByHikeId(hikeId);
    const payments = await this.paymentRepository.findPendingPaymentsByHikeId(
      hikeId
    );

    for (const p of payments) {
      const ride = await this.rideRepository.findById(p.getRideId());
      if (ride) filteredRidersMap.set(ride.getRideId()!, ride);
    }

    const filteredRiders = Array.from(filteredRidersMap.values());

    const matchedRiders = [];
    for (const ride of filteredRiders) {
      const match = await this.rideMatchService.evaluate(
        ride,
        { pickup, destination },
        this.geoService
      );
      if (match) {
        const request = JoinRequests.find(
          r => r.getRideId() === ride.getRideId()
        );
        const payment = payments.find(
          p => p.getJoinRequestId() == request?.getId()
        );
        matchedRiders.push({
          ...match,
          requestStatus: request ? request.getStatus() : null,
          paymentId: payment ? payment.getId()! : null,
        });
      }
    }

    return matchedRiders;
  }
}
