import express, { Request, Response } from 'express';
import { expressAdapter } from '../../../adapters/express';
import { DocumentComposer } from '../../../../infra/services/composer/document.composer';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { sessionComposer } from '../../../../infra/services/composer/session.composer';

const router = express.Router();

router.get(
  '/documents',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      DocumentComposer().findUserDocuments(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

router.get(
  '/session/active',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      sessionComposer().getActiveUserSession(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

export default router;
