import {
  AdminGetHikeDetailsResDTO,
  RiderResponseDTO,
} from '../../../domain/dto/adminHikesDTO';
import { HikeLog } from '../../../domain/entities/Hike';
import { Payment } from '../../../domain/entities/Payment';
import { RideLog } from '../../../domain/entities/Ride';
import { RideBooking } from '../../../domain/entities/RideBooking';
import { User } from '../../../domain/entities/User';
import { UserNotFound } from '../../../domain/errors/CustomError';
import { HikeNotFound } from '../../../domain/errors/HikeErrors';
import { hikeMapper } from '../../mappers/HikeMapper';
import { PaymentMapper } from '../../mappers/PaymentMapper';
import { RideBookingMapper } from '../../mappers/RideBookingMapper';
import { userMapper } from '../../mappers/UserResponse.mapper';
import { IHikeRepository } from '../../repositories/IHikeRepository';
import { IPaymentRepository } from '../../repositories/IPaymentRepository';
import { IRideBookingRepository } from '../../repositories/IRideBooking';
import { IRideRepository } from '../../repositories/IRideRepository';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IAdminGetHikeDetailsUseCase } from './IAdminHikeDetailsUseCase';

export class AdminHikeDetailsUseCase implements IAdminGetHikeDetailsUseCase {
  constructor(
    private readonly hikeRepository: IHikeRepository,
    private readonly userRepository: IUserRepository,
    private readonly rideBookingRepository: IRideBookingRepository,
    private readonly paymentRepository: IPaymentRepository,
    private readonly rideRepository: IRideRepository
  ) {}

  async execute(hikeId: string): Promise<AdminGetHikeDetailsResDTO> {
    const hike = await this.hikeRepository.findById(hikeId);
    if (!hike) throw new HikeNotFound();

    const hikerId = hike.getUserId();
    const riderId = hike.getRiderId();

    const [hiker, rider, booking] = await Promise.all([
      this.userRepository.findById(hikerId),
      riderId ? this.userRepository.findById(riderId) : Promise.resolve(null),
      hike.getBookingId()
        ? this.rideBookingRepository.findById(hike.getBookingId()!)
        : Promise.resolve(null),
    ]);
    if (!hiker) throw new UserNotFound();

    let rideLog, payment;
    if (booking) {
      [rideLog, payment] = await Promise.all([
        booking.getRideId()
          ? this.rideRepository.findById(booking.getRideId()!)
          : Promise.resolve(null),
        booking.getPaymentId()
          ? this.paymentRepository.findById(booking.getPaymentId()!)
          : Promise.resolve(null),
      ]);
    }

    return this.buildResponse(hike, hiker, rider, booking, rideLog, payment);
  }

  private buildResponse(
    hike: HikeLog,
    hiker: User,
    rider: User | null,
    booking?: RideBooking | null,
    rideLog?: RideLog | null,
    payment?: Payment | null
  ): AdminGetHikeDetailsResDTO {
    return {
      ...hikeMapper(hike),
      user: userMapper(hiker),
      rider: this.buildRiderResponse(rider, rideLog),
      booking: booking ? RideBookingMapper(booking) : undefined,
      payment: payment ? PaymentMapper.toResponseDTO(payment) : undefined,
    };
  }

  private buildRiderResponse(
    rider: User | null,
    rideLog?: RideLog | null
  ): RiderResponseDTO | undefined {
    if (!rider || !rideLog) return undefined;
    const riderDTO = userMapper(rider);

    return {
      ...riderDTO,
      vehicle: {
        model: rideLog.getVehicleModel(),
        number: rideLog.getVehicleNumber(),
        type: rideLog.getVehicleType(),
      },
    };
  }
}
