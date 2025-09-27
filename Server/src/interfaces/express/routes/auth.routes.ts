import express, { Request, Response } from 'express';
import { expressAdapter } from '../../adapters/express';
import { authComposer } from '../../../infra/services/composer/auth.composer';

const router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpRequest =>
    authComposer().signup(httpRequest)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

router.post('/login', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpRequest =>
    authComposer().login(httpRequest)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

export default router;
