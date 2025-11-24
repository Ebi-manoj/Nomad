import express, { Request, Response } from 'express';
import { expressAdapter } from '../../../adapters/express';
import { rideComposer } from '../../../../infra/services/composer/user/ride.composer';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = express.Router();

router.get('', authMiddleware, async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    rideComposer().getRides(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

router.post('/create', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    rideComposer().createRide(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});
router.get('/:rideId', authMiddleware, async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    rideComposer().getRideDetails(httpReq)
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

router.post(
  '/join-request/accept',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      rideComposer().acceptJoinRequests(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

router.patch(
  '/join-request/decline',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      rideComposer().declineJoinRequests(httpReq)
    );

    return res.status(adapter.statusCode).json(adapter.body);
  }
);
router.get(
  '/hikers-matched/:rideId',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      rideComposer().getHikersMatched(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);
router.patch(
  '/:rideId/end',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      rideComposer().endRide(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

export default router;
