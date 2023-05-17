import express from 'express';
import {
    createTransactionSchema,
    updateTransactionSchema,
    deleteTransactionSchema,
} from '../schemas';
import { validate } from '../middleware';
import { transactions } from '../controllers';

const router = express.Router();

router.get('/', transactions.getTransactions);

router.post(
    '/',
    validate(createTransactionSchema),
    transactions.createTransaction
);

router.put(
    '/:transactionId',
    validate(updateTransactionSchema),
    transactions.updateTransaction
);

router.delete(
    '/:transactionId',
    validate(deleteTransactionSchema),
    transactions.deleteTransaction
);

export default router;
