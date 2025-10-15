import express, { Request, Response } from 'express';
import { expressAdapter } from '../../adapters/express';
import {
  presignedURLComposer,
  DocumentComposer,
} from '../../../infra/services/composer/document.composer';
import { authMiddleware } from '../middlewares/authMiddleware';
import { isAdmin } from '../middlewares/isAdmin';

const router = express.Router();

router.post(
  '/get-presigned-url',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      presignedURLComposer().getPresignedUrl(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);
router.post(
  '/view/get-presigned-url',
  authMiddleware,
  isAdmin,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      presignedURLComposer().getViewPresignedUrl(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

router.post(
  '/upload/document',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      DocumentComposer().uploadDocument(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

export default router;
