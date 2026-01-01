import express, { Request, Response } from 'express';
import { expressAdapter } from '../../../adapters/express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { insightComposer } from '../../../../infra/services/composer/user/insight.composer';

const router = express.Router();

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq => insightComposer().getOverview(httpReq));
  return res.status(adapter.statusCode).json(adapter.body);
});

export default router;
