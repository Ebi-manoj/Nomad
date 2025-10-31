import { ActiveSessionsUseCase } from '../../../application/usecases/User/ActiveSessionsUseCase';
import { ISessionController } from '../../../interfaces/http/controllers/ISessionController';
import { SessionController } from '../../../interfaces/http/controllers/session.controller';
import { HikeRepository } from '../../repositories/HikeRepository';
import { RideRepository } from '../../repositories/RideRepository';

export function sessionComposer(): ISessionController {
  const hikeRepository = new HikeRepository();
  const rideRepository = new RideRepository();
  const activeSessionUseCase = new ActiveSessionsUseCase(
    hikeRepository,
    rideRepository
  );
  return new SessionController(activeSessionUseCase);
}
