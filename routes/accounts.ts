import express from 'express';
import { accountsSchema } from '../schemas';
import { validate } from '../middleware';
import { accounts } from '../controllers';

const router = express.Router();

router.get('/', accounts.getAccounts);

router.get(
    '/:accountId',
    validate(accountsSchema.getAccountByIdSchema),
    accounts.getAccountById
);

router.post(
    '/',
    validate(accountsSchema.createAccountSchema),
    accounts.createAccount
);

router.put(
    '/:accountId',
    validate(accountsSchema.updateAccountSchema),
    accounts.updateAccount
);

router.delete(
    '/:accountId',
    validate(accountsSchema.deleteAccountSchema),
    accounts.deleteAccount
);

export default router;
