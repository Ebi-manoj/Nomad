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

  async findbyPaymentId(id: string): Promise<RideBooking | null> {
    const found = await this.model.findOne({ paymentId: id });
    if (!found) return null;
    return this.mapper.toDomain(found);
  }

  async findByRideId(id: string): Promise<RideBooking[]> {
    const rideBookings = await this.model.find({ rideId: id });
    return rideBookings.map(r => this.mapper.toDomain(r));
  }
}
