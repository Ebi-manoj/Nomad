import express, { Request, Response } from 'express';
import { expressAdapter } from '../../../adapters/express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { isAdmin } from '../../middlewares/isAdmin';
import { subscriptionPlanAdminComposer } from '../../../../infra/services/composer/admin/subscriptionPlanAdminComposer';

const router = express.Router();

router.post('/', authMiddleware, isAdmin, async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    subscriptionPlanAdminComposer().createSubscriptionPlan(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

export default router;
