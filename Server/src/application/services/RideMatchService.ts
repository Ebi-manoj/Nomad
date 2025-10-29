import { RideMatchResponseDTO } from '../../domain/dto/RideMatch';
import { RideLog } from '../../domain/entities/Ride';
import { IGeoService } from '../providers/IGeoService';
import { ILocationRepository } from '../repositories/ILocationRepository';
import { UserRepository } from '../repositories/UserRepository';
import { DurationCalculator } from './DurationCalculator';

export class RideMatchService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly durationCalculator: DurationCalculator,
    private readonly locationRepository: ILocationRepository
  ) {}

  async evaluate(
    ride: RideLog,
    context: { pickup: GeoJSON.Point; destination: GeoJSON.Point },
    geo: IGeoService
  ): Promise<RideMatchResponseDTO | null> {
    const route = ride.getRoute().coordinates;
    // Validate ride route
    if (!route || route.length < 2) return null;

    // Create a turf line from ride's route
    const rideRoute = geo.createLine(route);

    const pickup = [
      context.pickup.coordinates[1],
      context.pickup.coordinates[0],
    ];
    const destination = [
      context.destination.coordinates[1],
      context.destination.coordinates[0],
    ];
    const riderCurrentLocation = await this.locationRepository.getLocation(
      ride.getRideId()!
    );
    if (!riderCurrentLocation) return null;

    // Hiker pickup & destination points
    const hikerPickup = geo.createPoint(pickup);
    const hikerDestination = geo.createPoint(destination);

    //  Distance from pickup to ride route
    const pickupDistanceToRoute = geo.pointToLineDistance(
      hikerPickup,
      rideRoute
    );

    //  Distance from destination to ride route
    const destinationDistanceToRoute = geo.pointToLineDistance(
      hikerDestination,
      rideRoute
    );

    // Reject if pickup > 2 km or destination > 5 km from ride’s path
    if (pickupDistanceToRoute > 2) return null;
    if (destinationDistanceToRoute > 5) return null;

    //  Find nearest points on the ride's route for pickup & destination
    const nearestPickupPoint = geo.nearestPointOnLine(rideRoute, hikerPickup);
    const nearestDestPoint = geo.nearestPointOnLine(
      rideRoute,
      hikerDestination
    );

    const currentLocation = [
      riderCurrentLocation.lng,
      riderCurrentLocation.lat,
    ];
    const currentLocationPoint = geo.createPoint(currentLocation);

    ///////////////////////////////////
    //Calculate Progress
    const pickupProgressKm = geo.calculateDistanceAlongLine(
      geo.createPoint(route[0]),
      nearestPickupPoint,
      rideRoute
    );
    const riderProgressKm = geo.calculateDistanceAlongLine(
      geo.createPoint(route[0]),
      currentLocationPoint,
      rideRoute
    );
    const destinationProgressKm = geo.calculateDistanceAlongLine(
      geo.createPoint(route[0]),
      nearestDestPoint,
      rideRoute
    );

    const pickupAheadDiff = pickupProgressKm - riderProgressKm;
    const destinationAheadDiff = destinationProgressKm - riderProgressKm;
    if (pickupAheadDiff < -0.5 || destinationAheadDiff < 0.5) {
      return null;
    }

    ///////////////////////////////////////
    //Find Departure
    const departureDistance = geo.distanceBetweenPoints(
      currentLocationPoint,
      nearestPickupPoint
    );
    const departure =
      this.durationCalculator.durationBetweenTwoPoints(departureDistance);

    // Find Duration
    const routeDistance = geo.distanceBetweenPoints(
      nearestPickupPoint,
      nearestDestPoint
    );
    const duration =
      this.durationCalculator.durationBetweenTwoPoints(routeDistance);
    // Get the userDetail
    const user = await this.userRepository.findById(ride.getRiderId());
    if (!user) return null;

    // Return ride match summary
    return {
      rideId: ride.getRideId()!,
      rideStartLocation: ride.getPickup(),
      rideEndLocation: ride.getDestination(),
      currentRiderLocation: currentLocationPoint.geometry,
      costSharing: ride.getCostSharing(),
      nearestPickup: nearestPickupPoint.geometry,
      nearestDestination: nearestDestPoint.geometry,
      distanceAwayfromPickup: Math.round(pickupDistanceToRoute * 10) / 10,
      distanceAwayfromDestination:
        Math.round(destinationDistanceToRoute * 10) / 10,
      departure,
      seatsLeft: ride.getSeatsAvailable(),
      duration,
      user: {
        fullName: user.getFullName(),
        vehicleModal: ride.getVehicleModel(),
        vehicleType: ride.getVehicleType(),
      },
    };
  }
}
