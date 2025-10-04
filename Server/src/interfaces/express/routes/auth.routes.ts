import express, { Request, Response } from 'express';
import { expressAdapter } from '../../adapters/express';
import { authComposer } from '../../../infra/services/composer/auth.composer';
import { verifyEmailToken } from '../middlewares/verifyEmailToken';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';

const router = express.Router();

router.post(
  '/signup',
  verifyEmailToken,
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
  const { accessToken, refreshToken, user } = adapter.body.data;
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res
    .status(adapter.statusCode)
    .json({ ...adapter.body, data: { user, accessToken } });
});

router.post('/send-otp/signup', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpRequest =>
    authComposer().sendSignupOTP(httpRequest)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

router.post('/send-otp/reset', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpRequest =>
    authComposer().sendResetOTP(httpRequest)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

router.post('/verify-otp', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpRequest =>
    authComposer().verifyOTP(httpRequest)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

router.post(
  '/reset-password',
  verifyEmailToken,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpRequest =>
      authComposer().resetPassword(httpRequest)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

router.get('/refreshtoken', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpRequest =>
    authComposer().refreshToken(httpRequest)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

router.post('/logout', async (req: Request, res: Response) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  res
    .status(HttpStatus.OK)
    .json({ success: true, data: { message: 'Logout successfully' } });
});

router.post('/google', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpRequest =>
    authComposer().googleSingup(httpRequest)
  );
  res.status(adapter.statusCode).json(adapter.body);
});

export default router;
