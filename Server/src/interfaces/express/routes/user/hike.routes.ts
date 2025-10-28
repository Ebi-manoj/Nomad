import express, { Request, Response } from 'express';
import { expressAdapter } from '../../../adapters/express';
import { hikeComposer } from '../../../../infra/services/composer/user/hike.composer';

const router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    hikeComposer().createHike(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

router.post('/match-rides', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    hikeComposer().matchRides(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

export default router;
