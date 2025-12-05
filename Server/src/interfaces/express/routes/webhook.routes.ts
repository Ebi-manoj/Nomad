import express, { Request, Response } from 'express';
import { expressAdapter } from '../../adapters/express';
import { subscriptionComposer } from '../../../infra/services/composer/user/subscription.composer';

const router = express.Router();

router.post(
  '/subscription',
  express.raw({ type: 'application/json' }),
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      subscriptionComposer().handleWebhook(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

export default router;
