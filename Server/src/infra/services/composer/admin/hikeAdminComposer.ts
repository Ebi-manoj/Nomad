import { AdminHikeDetailsUseCase } from '../../../../application/usecases/Admin/AdminHikeDetailsUseCase';
import { GetAllHikeUseCase } from '../../../../application/usecases/Admin/GetAllHikeUseCase';
import { AdminHikeController } from '../../../../interfaces/http/controllers/adminHike.controller';
import { IAdminHikeController } from '../../../../interfaces/http/controllers/IAdminHikeController';
import { HikeRepository } from '../../../repositories/HikeRepository';
import { PaymentRepository } from '../../../repositories/PaymentRepository';
import { RideBookingRepository } from '../../../repositories/RideBookingRepository';
import { RideRepository } from '../../../repositories/RideRepository';
import { MongoUserRepository } from '../../../repositories/UserRepository';

export function hikeAdminComposer(): IAdminHikeController {
  const hikeRepository = new HikeRepository();
  const userRepository = new MongoUserRepository();
  const rideRepository = new RideRepository();
  const bookingRepository = new RideBookingRepository();
  const paymentRepository = new PaymentRepository();
  const getAllHikeUseCase = new GetAllHikeUseCase(
    hikeRepository,
    userRepository
  );

  const getHikeDetailsUseCase = new AdminHikeDetailsUseCase(
    hikeRepository,
    userRepository,
    bookingRepository,
    paymentRepository,
    rideRepository
  );

  return new AdminHikeController(getAllHikeUseCase, getHikeDetailsUseCase);
}
