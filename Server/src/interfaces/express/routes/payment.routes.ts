import express, { Request, Response } from 'express';
import { expressAdapter } from '../../adapters/express';
import { paymentComposer } from '../../../infra/services/composer/payment.composer';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.get(
  '/hike/:paymentId',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      paymentComposer().getPaymentInfo(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

export default router;
