import express, { Request, Response } from 'express';
import { expressAdapter } from '../../../adapters/express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { isAdmin } from '../../middlewares/isAdmin';
import { rideAdminComposer } from '../../../../infra/services/composer/admin/rideAdminComposer';

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  isAdmin,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      rideAdminComposer().getAllRides(httpReq)
    );

    return res.status(adapter.statusCode).json(adapter.body);
  }
);

export default router;
