import express, { Request, Response } from 'express';
import { expressAdapter } from '../../adapters/express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { subscriptionComposer } from '../../../infra/services/composer/user/subscription.composer';

const router = express.Router();

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    subscriptionComposer().getSubscription(httpReq)
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

export default router;
