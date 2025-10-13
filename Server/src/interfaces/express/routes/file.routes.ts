import express, { Request, Response } from 'express';
import { expressAdapter } from '../../adapters/express';
import {
  presignedURLComposer,
  DocumentComposer,
} from '../../../infra/services/composer/document.composer';

const router = express.Router();

router.post('/get-presigned-url', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    presignedURLComposer().getPresignedUrl(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

router.post('/upload/document', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    DocumentComposer().verifyDocument(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

export default router;
