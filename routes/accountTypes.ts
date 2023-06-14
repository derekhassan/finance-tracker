import express from 'express';
import { accountTypesSchema } from '../schemas';
import { validate } from '../middleware';
import { accountTypes } from '../controllers';

const router = express.Router();

router.get('/', accountTypes.getAccountTypes);

router.get(
    '/:accountTypeId',
    validate(accountTypesSchema.getAccountTypeByIdSchema),
    accountTypes.getAccountTypeById
);

router.post(
    '/',
    validate(accountTypesSchema.createAccountTypeSchema),
    accountTypes.createAccountType
);

router.put(
    '/:accountTypeId',
    validate(accountTypesSchema.updateAccountTypeSchema),
    accountTypes.updateAccountType
);

router.delete(
    '/:accountTypeId',
    validate(accountTypesSchema.deleteAccountTypeSchema),
    accountTypes.deleteAccountType
);

export default router;
