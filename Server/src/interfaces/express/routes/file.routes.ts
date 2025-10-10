import express, { Request, Response } from 'express';
import { expressAdapter } from '../../adapters/express';
import { fileComposer } from '../../../infra/services/composer/file.composer';

const router = express.Router();

router.post('/get-presigned-url', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    fileComposer().getPresignedUrl(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

export default router;
