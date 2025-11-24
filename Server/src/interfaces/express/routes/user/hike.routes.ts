import express, { Request, Response } from 'express';
import { expressAdapter } from '../../../adapters/express';
import { hikeComposer } from '../../../../infra/services/composer/user/hike.composer';
import { ridebookingComposer } from '../../../../infra/services/composer/user/rideBooking.composer';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = express.Router();

router.get('', authMiddleware, async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    hikeComposer().getHikes(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});
router.post('/create', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    hikeComposer().createHike(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});
router.get('/:hikeId', authMiddleware, async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    hikeComposer().getHikeDetails(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

router.post('/match-rides', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    hikeComposer().matchRides(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

router.post('/join-ride', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    hikeComposer().joinRideRequest(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

router.get(
  '/:bookingId/booking',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      ridebookingComposer().getRideBooking(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);
router.get(
  '/:bookingId/booking/live',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      ridebookingComposer().getRideBookingLive(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

router.patch(
  '/:bookingId/dropoff',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      ridebookingComposer().markDroppOff(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);
router.get(
  '/:bookingId/cancel-request',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      ridebookingComposer().reqCancelBooking(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

router.patch(
  '/:bookingId/cancel',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      ridebookingComposer().cancelBooking(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

export default router;
