import express, { Request, Response } from 'express';
import { expressAdapter } from '../../adapters/express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { subscriptionComposer } from '../../../infra/services/composer/user/subscription.composer';
import { SubscriptionPlanModel } from '../../../infra/database/SubscriptionPlan.model';

const router = express.Router();

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    subscriptionComposer().getSubscription(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});
router.get('/plans', authMiddleware, async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    subscriptionComposer().getActivePlans(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

router.post(
  '/checkout',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      subscriptionComposer().createCheckoutSession(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

router.get('/verify', authMiddleware, async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    subscriptionComposer().verifySubscription(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

router.post(
  '/change-plan',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      subscriptionComposer().changePlan(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

export default router;
