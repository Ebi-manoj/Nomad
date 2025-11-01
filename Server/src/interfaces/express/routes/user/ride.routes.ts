import express, { Request, Response } from 'express';
import { expressAdapter } from '../../../adapters/express';
import { rideComposer } from '../../../../infra/services/composer/user/ride.composer';

const router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    rideComposer().createRide(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

router.get(
  '/join-request/:rideId/pending',
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      rideComposer().getPendingJoinRequests(httpReq)
    );

    return res.status(adapter.statusCode).json(adapter.body);
  }
);

export default router;
