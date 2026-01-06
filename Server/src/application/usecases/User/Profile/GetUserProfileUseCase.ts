import { GetUserProfileResDTO } from '../../../../domain/dto/userProfileDTO';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { userMapper } from '../../../mappers/UserResponse.mapper';
import {  UserNotFound } from '../../../../domain/errors/CustomError';
import { IGetUserProfileUseCase } from './IGetUserProfileUseCase';

export class GetUserProfileUseCase implements IGetUserProfileUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _rideRepository: IRideRepository,
    private readonly _hikeRepository: IHikeRepository
  ) {}

  async execute(userId: string): Promise<GetUserProfileResDTO> {
    const user = await this._userRepository.findById(userId);
    if (!user) throw new UserNotFound();

    const [totalRides, totalHikes] = await Promise.all([
      this._rideRepository.findCountUserRides(userId),
      this._hikeRepository.findCountUserHikes(userId),
    ]);

    return {
      user: userMapper(user),
      totalRides,
      totalHikes,
    };
  }
}
