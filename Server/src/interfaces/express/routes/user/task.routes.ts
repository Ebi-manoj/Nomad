import express, { Request, Response } from 'express';
import { expressAdapter } from '../../../adapters/express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { taskComposer } from '../../../../infra/services/composer/user/task.composer';

const router = express.Router();

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    taskComposer().getTasks(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

export default router;
