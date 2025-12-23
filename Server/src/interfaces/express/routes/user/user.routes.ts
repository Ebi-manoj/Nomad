import express, { Request, Response } from 'express';
import { expressAdapter } from '../../../adapters/express';
import { DocumentComposer } from '../../../../infra/services/composer/document.composer';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { sessionComposer } from '../../../../infra/services/composer/session.composer';
import { sosComposer } from '../../../../infra/services/composer/user/sos.composer';
import { walletComposer } from '../../../../infra/services/composer/user/wallet.composer';
import { bankAccountComposer } from '../../../../infra/services/composer/user/bankAccount.composer';

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

router.get('/sos', authMiddleware, async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    sosComposer().getContacts(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

router.get(
  '/session/active',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      sessionComposer().getActiveUserSession(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

router.post('/sos', authMiddleware, async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    sosComposer().saveContacts(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});
router.put(
  '/sos/:contactId',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      sosComposer().editContact(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);
router.delete(
  '/sos/:contactId',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      sosComposer().deleteContact(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

router.post(
  '/sos/trigger',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      sosComposer().triggerSos(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

router.post(
  '/sos/trigger/ride',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      sosComposer().triggerRideSos(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

router.get('/wallet', authMiddleware, async (req: Request, res: Response) => {
  const adapter = await expressAdapter(req, httpReq =>
    walletComposer().getWallet(httpReq)
  );
  return res.status(adapter.statusCode).json(adapter.body);
});

router.post(
  '/bank-accounts',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      bankAccountComposer().addBankAccount(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

router.get(
  '/bank-accounts',
  authMiddleware,
  async (req: Request, res: Response) => {
    const adapter = await expressAdapter(req, httpReq =>
      bankAccountComposer().getBankAccounts(httpReq)
    );
    return res.status(adapter.statusCode).json(adapter.body);
  }
);

export default router;
