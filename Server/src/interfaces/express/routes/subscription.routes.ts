import express, { Request, Response } from 'express';
import { expressAdapter } from '../../adapters/express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { subscriptionComposer } from '../../../infra/services/composer/user/subscription.composer';

const router = express.Router();

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

export default router;
