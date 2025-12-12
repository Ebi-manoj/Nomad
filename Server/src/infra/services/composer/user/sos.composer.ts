import { SaveSosContactsUseCase } from '../../../../application/usecases/User/Sos/SaveSosContactsUseCase';
import { GetSosContactsUseCase } from '../../../../application/usecases/User/Sos/GetSosContactsUseCase';
import { TriggerSosUseCase } from '../../../../application/usecases/User/Sos/TriggerSosUseCase';
import { TriggerRideSosUseCase } from '../../../../application/usecases/User/Sos/TriggerRideSosUseCase';
import { LocationResolver } from '../../../../application/services/LocationResolver';
import { SosService } from '../../../../application/services/SosService';
import { SosEmailNotifier } from '../../../../application/services/SosEmailNotifier';
import { ISosController } from '../../../../interfaces/http/controllers/ISosController';
import { SosController } from '../../../../interfaces/http/controllers/sos.controller';
import { SosContactRepository } from '../../../repositories/SosContactRepository';
import { SosLogRepository } from '../../../repositories/SosLogRepository';
import { RideBookingRepository } from '../../../repositories/RideBookingRepository';
import { LocationRepository } from '../../../repositories/LocationRepository';
import { RideRepository } from '../../../repositories/RideRepository';
import { NodemailerTransporter } from '../../../providers/emailTransporter';
import { EditSosContactUseCase } from '../../../../application/usecases/User/Sos/EditSosContact';

export function sosComposer(): ISosController {
  const sosRepository = new SosContactRepository();
  const saveSosContactsUseCase = new SaveSosContactsUseCase(sosRepository);
  const getSosContactsUseCase = new GetSosContactsUseCase(sosRepository);

  const sosLogRepository = new SosLogRepository();
  const rideBookingRepository = new RideBookingRepository();
  const locationRepository = new LocationRepository();
  const rideRepository = new RideRepository();

  const locationResolver = new LocationResolver(locationRepository);
  const sosService = new SosService(sosLogRepository, locationResolver);
  const emailTransporter = new NodemailerTransporter();
  const sosNotifier = new SosEmailNotifier(sosRepository, emailTransporter);

  const editSosContactUseCase = new EditSosContactUseCase(sosRepository);

  const triggerSosUseCase = new TriggerSosUseCase(
    rideBookingRepository,
    sosService,
    sosNotifier
  );

  const triggerRideSosUseCase = new TriggerRideSosUseCase(
    rideRepository,
    sosService,
    sosNotifier
  );

  return new SosController(
    saveSosContactsUseCase,
    getSosContactsUseCase,
    editSosContactUseCase,
    triggerSosUseCase,
    triggerRideSosUseCase
  );
}
