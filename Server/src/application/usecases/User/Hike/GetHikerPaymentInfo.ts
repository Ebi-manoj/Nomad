import {
  HikerPaymentInfoRequestDTO,
  HikerPaymentInfoResponseDTO,
} from '../../../../domain/dto/paymentDTO';
import { UserNotFound } from '../../../../domain/errors/CustomError';
import { HikeNotFound } from '../../../../domain/errors/HikeErrors';
import {
  JoinRequestNotFound,
  NotAuthorizedToAccept,
} from '../../../../domain/errors/JoinRequestError';
import { PaymentInfoNotFound } from '../../../../domain/errors/PaymentError';
import { IGoogleApi } from '../../../providers/IGoogleApi';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { IJoinRequestRepository } from '../../../repositories/IJoinRequestsRepository';
import { IPaymentRepository } from '../../../repositories/IPaymentRepository';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { IGetHikerPaymentInfoUseCase } from './IGetHikerPaymentInfo';

export class GetHikerPaymentInfoUseCase implements IGetHikerPaymentInfoUseCase {
  constructor(
    private readonly paymentRepository: IPaymentRepository,
    private readonly joinRequestRepository: IJoinRequestRepository,
    private readonly hikeRepository: IHikeRepository,
    private readonly userRepository: IUserRepository,
    private readonly googleApi: IGoogleApi
  ) {}

  async execute(
    data: HikerPaymentInfoRequestDTO
  ): Promise<HikerPaymentInfoResponseDTO> {
    const payment = await this.paymentRepository.findById(data.paymentId);
    if (!payment) throw new PaymentInfoNotFound();

    if (payment.getHikerId() !== data.userId) throw new NotAuthorizedToAccept();

    const joinRequest = await this.joinRequestRepository.findById(
      payment.getJoinRequestId()
    );
    if (!joinRequest) throw new JoinRequestNotFound();

    const hike = await this.hikeRepository.findById(joinRequest.getHikeId());
    if (!hike) throw new HikeNotFound();
    const pickup = {
      lat: hike.getPickup().coordinates[0],
      lng: hike.getPickup().coordinates[1],
    };

    const destination = {
      lat: hike.getDestination().coordinates[0],
      lng: hike.getDestination().coordinates[1],
    };

    const nearestPickup = {
      lat: joinRequest.getPickupLocation().coordinates[1],
      lng: joinRequest.getPickupLocation().coordinates[0],
    };

    const nearestDestination = {
      lat: joinRequest.getDropoffLocation().coordinates[1],
      lng: joinRequest.getDropoffLocation().coordinates[0],
    };

    const distanceAwayfromPickup = await this.googleApi.getDistance(
      pickup,
      nearestPickup
    );
    const distanceAwayfromDestination = await this.googleApi.getDistance(
      destination,
      nearestDestination
    );

    const rider = await this.userRepository.findById(payment.getRiderId());
    if (!rider) throw new UserNotFound();
    const amount = Number(
      (payment.getAmount() - payment.getPlatformFee()).toFixed(2)
    );
    return {
      rider: {
        fullName: rider.getFullName(),
        profilePic: '',
        rating: 4.6,
      },
      route: {
        distanceAwayfromPickup,
        distanceAwayfromDestination,
      },
      amount,
      platformFee: payment.getPlatformFee(),
      totalAmount: payment.getAmount(),
      expiresAt: payment.getExpiresAt(),
    };
  }
}
