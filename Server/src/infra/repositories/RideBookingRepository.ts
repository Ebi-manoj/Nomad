import { MongoBaseRepository } from './BaseRepository';
import { IRideBookingRepository } from '../../application/repositories/IRideBooking';
import { RideBooking } from '../../domain/entities/RideBooking';
import {
  IRideBookingDocument,
  RideBookingModel,
} from '../database/RideBooking.model';
import { rideBookingMapper } from '../mappers/rideBookingMapper';
import { Types } from 'mongoose';

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

  async findByBookingNumber(bookingNumber: string): Promise<RideBooking | null> {
    const booking = await this.model.findOne({ bookingNumber });
    return booking ? this.mapper.toDomain(booking) : null;
  }

  async findByRideId(id: string): Promise<RideBooking[]> {
    const rideBookings = await this.model.find({ rideId: id });
    return rideBookings.map(r => this.mapper.toDomain(r));
  }

  async findByHikeId(id: string): Promise<RideBooking | null> {
    const booking = await this.model.findOne({ hikeId: id });
    return booking ? this.mapper.toDomain(booking) : null;
  }

  async getTotalCostShareOfRide(rideId: string): Promise<number> {
    const result = await this.model.aggregate([
      {
        $match: { rideId: new Types.ObjectId(rideId) },
      },
      {
        $group: {
          _id: null,
          totalCost: {
            $sum: {
              $subtract: [
                {
                  $subtract: [
                    '$amount',
                    { $ifNull: ['$refundedAmount', 0] },
                  ],
                },
                '$platformFee',
              ],
            },
          },
        },
      },
    ]);
    if (!result.length) return 0;

    return result[0].totalCost;
  }
}
