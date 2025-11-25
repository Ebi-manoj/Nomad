import {
  GetHikeDetailsReqDTO,
  GetHikeDetailsResponseDTO,
} from '../../../../domain/dto/HikeDTO';
import { Forbidden } from '../../../../domain/errors/CustomError';
import { HikeNotFound } from '../../../../domain/errors/HikeErrors';
import { HikeDetailsMapper } from '../../../mappers/HikeMapper';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { IPaymentRepository } from '../../../repositories/IPaymentRepository';
import { IReviewRepository } from '../../../repositories/IReviewRepository';
import { IRideBookingRepository } from '../../../repositories/IRideBooking';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { IGetHikeDetailsUseCase } from './IGetHikeDetails';

export class GetHikeDetailsUseCase implements IGetHikeDetailsUseCase {
  constructor(
    private readonly hikeRepository: IHikeRepository,
    private readonly bookingRepository: IRideBookingRepository,
    private readonly paymentRepository: IPaymentRepository,
    private readonly userRepository: IUserRepository,
    private readonly reviewRepository: IReviewRepository
  ) {}
  async execute(
    data: GetHikeDetailsReqDTO
  ): Promise<GetHikeDetailsResponseDTO> {
    const hike = await this.hikeRepository.findById(data.hikeId);
    if (!hike) throw new HikeNotFound();

    if (hike.getUserId() !== data.userId) throw new Forbidden();

    let booking = null;
    const bookingId = hike.getBookingId();
    if (bookingId) {
      booking = await this.bookingRepository.findById(bookingId);
    }

    let payment = null;
    if (booking) {
      payment = await this.paymentRepository.findById(booking.getPaymentId());
    }

    let rider = null;
    const riderId = hike.getRiderId();
    if (riderId) {
      rider = await this.userRepository.findById(riderId);
    }

    let review = null;
    if (booking) {
      review = await this.reviewRepository.findByReviewerAndBooking(
        data.userId,
        booking.getId()!
      );
    }

    return HikeDetailsMapper(hike, payment, booking, rider, review);
  }
}
