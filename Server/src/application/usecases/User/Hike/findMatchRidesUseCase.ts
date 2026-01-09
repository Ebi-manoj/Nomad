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
    private readonly _rideRepository: IRideRepository,
    private readonly _rideMatchService: IRideMatchService,
    private readonly _geoService: IGeoService,
    private readonly _hikeRepository: IHikeRepository,
    private readonly _joinRequestRepository: IJoinRequestRepository,
    private readonly _paymentRepository: IPaymentRepository
  ) {}

  async execute(hikeId: string): Promise<RideMatchResponseDTO[]> {
    const hikelog = await this._hikeRepository.findById(hikeId);
    if (!hikelog) return [];

    const pickup = hikelog.getPickup();
    const destination = hikelog.getDestination();
    const seatRequested = hikelog.getSeatsRequested();
    const hasHelmet = hikelog.getHasHelmet();

    const activeRiders = await this._rideRepository.findActiveNearbyRiders(
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

    const JoinRequests = await this._joinRequestRepository.findByHikeId(hikeId);
    const payments = await this._paymentRepository.findPendingPaymentsByHikeId(
      hikeId
    );

    for (const p of payments) {
      const ride = await this._rideRepository.findById(p.getRideId());
      if (ride) filteredRidersMap.set(ride.getRideId()!, ride);
    }

    const filteredRiders = Array.from(filteredRidersMap.values());

    const matchedRiders = [];
    for (const ride of filteredRiders) {
      const match = await this._rideMatchService.evaluate(
        ride,
        { pickup, destination },
        this._geoService
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
