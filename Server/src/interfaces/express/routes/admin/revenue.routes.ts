import express, { Request, Response } from 'express';
import { expressAdapter } from '../../../adapters/express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { isAdmin } from '../../middlewares/isAdmin';
import { revenueAdminComposer } from '../../../../infra/services/composer/admin/revenueAdminComposer';

const router = express.Router();

router.get('/', authMiddleware, isAdmin, async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    revenueAdminComposer().getOverview(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

export default router;
