import express, { Request, Response } from 'express';
import { expressAdapter } from '../../../adapters/express';
import { DocumentComposer } from '../../../../infra/services/composer/file.composer';
import { authMiddleware } from '../../middlewares/authMiddleware';

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

export default router;
