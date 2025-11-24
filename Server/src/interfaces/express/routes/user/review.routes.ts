import express, { Request, Response } from 'express';
import { expressAdapter } from '../../../adapters/express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { ratingComposer } from '../../../../infra/services/composer/user/rating.composer';

const router = express.Router();

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    ratingComposer().rateUser(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

export default router;
