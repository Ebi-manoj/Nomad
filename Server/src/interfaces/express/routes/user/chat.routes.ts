import express, { type Request, type Response } from 'express';
import { expressAdapter } from '../../../adapters/express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { chatComposer } from '../../../../infra/services/composer/chat.composer';

const router = express.Router();

router.get(
  '/:roomId',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      chatComposer().getMessages(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    chatComposer().sendMessage(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

export default router;
