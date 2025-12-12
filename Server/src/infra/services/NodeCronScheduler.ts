import { IScheduler } from '../../application/services/IScheduler';
import { ICleanupSeatsReservation } from '../../application/usecases/ICleanupSeatsReservation';
import cron from 'node-cron';

export class NodeCronScheduler implements IScheduler {
  constructor(
    private readonly _cleanupSeatsReservation: ICleanupSeatsReservation
  ) {}

  start() {
    cron.schedule('* * * * *', async () => {
      await this._cleanupSeatsReservation.execute();
    });
  }
}
