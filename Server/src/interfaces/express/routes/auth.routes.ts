import express, { Request, Response } from 'express';
import { expressAdapter } from '../../adapters/express';
import { authComposer } from '../../../infra/services/composer/auth.composer';
import { verifyRegisterUserToken } from '../middlewares/verifyRegisterUserToken';

const router = express.Router();

router.post(
  '/signup',
  verifyRegisterUserToken,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpRequest =>
      authComposer().signup(httpRequest)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

router.post('/login', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpRequest =>
    authComposer().login(httpRequest)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

router.post('/send-otp', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpRequest =>
    authComposer().sendOTP(httpRequest)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

router.post('/verify-otp', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpRequest =>
    authComposer().verifyOTP(httpRequest)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

export default router;
