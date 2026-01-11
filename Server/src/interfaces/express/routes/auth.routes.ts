import express, { Request, Response } from 'express';
import { expressAdapter } from '../../adapters/express';
import { authComposer } from '../../../infra/services/composer/auth.composer';
import { verifyEmailToken } from '../middlewares/verifyEmailToken';
import { HttpStatus } from '../../../domain/enums/HttpStatusCode';
import { authMiddleware } from '../middlewares/authMiddleware';


const router = express.Router();
const isProduction = process.env.NODE_ENV === 'production';
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
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
    ...(isProduction && { partitioned: true }),
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
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
    ...(isProduction && { partitioned: true }),
  });
  res
    .status(HttpStatus.OK)
    .json({ success: true, data: { message: 'Logout successfully' } });
});

router.post('/google', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpRequest =>
    authComposer().googleSingup(httpRequest)
  );
  const { accessToken, refreshToken, user } = adapter.body.data;
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
    ...(isProduction && { partitioned: true }),
  });
  return res
    .status(adapter.statusCode)
    .json({ ...adapter.body, data: { user, accessToken } });
});

router.post(
  '/change-password',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpRequest =>
      authComposer().changePassword(httpRequest)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

export default router;
