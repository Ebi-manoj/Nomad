import express, { Request, Response } from 'express';
import { expressAdapter } from '../../../adapters/express';
import { userManagementComposer } from '../../../../infra/services/composer/admin/userManagementComposer';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    userManagementComposer().getAllUsers(httpReq)
  );

  return res.status(adapter.statusCode).json(adapter.body);
});

router.patch('/:userId/block', async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    userManagementComposer().blockUser(httpReq)
  );

  return res.status(adapter.statusCode).json(adapter.body);
});

export default router;
