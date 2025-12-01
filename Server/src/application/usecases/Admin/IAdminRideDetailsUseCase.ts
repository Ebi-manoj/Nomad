import { AdminGetRideDetailsResDTO } from '../../../domain/dto/adminRidesDTO';

export interface IAdminRideDetailsUseCase {
  execute(rideId: string): Promise<AdminGetRideDetailsResDTO>;
}
