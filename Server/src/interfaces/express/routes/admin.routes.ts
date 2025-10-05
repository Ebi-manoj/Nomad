import express, { Request, Response } from 'express';
import { expressAdapter } from '../../adapters/express';
import { adminAuthComposer } from '../../../infra/services/composer/adminAuth.composer';

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    adminAuthComposer().login(httpReq)
  );
  const { accessToken, refreshToken, admin } = adapter.body.data;
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV == 'production',
    sameSite: 'lax',
    maxAge: 7 * 60 * 60 * 24 * 1000,
  });
  return res
    .status(adapter.statusCode)
    .json({ ...adapter.body, data: { accessToken, admin } });
});

export default router;
