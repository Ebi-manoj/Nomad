import { MongoBaseRepository } from './BaseRepository';
import { IRideBookingRepository } from '../../application/repositories/IRideBooking';
import { RideBooking } from '../../domain/entities/RideBooking';
import {
  IRideBookingDocument,
  RideBookingModel,
} from '../database/RideBooking.model';
import { rideBookingMapper } from '../mappers/rideBookingMapper';

export class RideBookingRepository
  extends MongoBaseRepository<RideBooking, IRideBookingDocument>
  implements IRideBookingRepository
{
  constructor() {
    super(RideBookingModel, rideBookingMapper);
  }
}
