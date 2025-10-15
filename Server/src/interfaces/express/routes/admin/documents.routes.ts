import express, { Request, Response } from 'express';
import { expressAdapter } from '../../../adapters/express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { isAdmin } from '../../middlewares/isAdmin';
import { DocumentComposer } from '../../../../infra/services/composer/document.composer';

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  isAdmin,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      DocumentComposer().findAllDocuments(httpReq)
    );

    return res.status(adapter.statusCode).json(adapter.body);
  }
);

router.patch(
  '/verify',
  authMiddleware,
  isAdmin,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      DocumentComposer().veirfyDocument(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

export default router;
