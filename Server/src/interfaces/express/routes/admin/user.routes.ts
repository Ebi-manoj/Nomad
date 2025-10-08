import express, { Request, Response } from 'express';
import { expressAdapter } from '../../../adapters/express';
import { userManagementComposer } from '../../../../infra/services/composer/admin/userManagementComposer';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { isAdmin } from '../../middlewares/isAdmin';

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  isAdmin,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      userManagementComposer().getAllUsers(httpReq)
    );

    return res.status(adapter.statusCode).json(adapter.body);
  }
);

router.patch(
  '/:userId/block',
  authMiddleware,
  isAdmin,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      userManagementComposer().blockUser(httpReq)
    );

    return res.status(adapter.statusCode).json(adapter.body);
  }
);

export default router;
