import express from 'express';
import { transactionsSchema } from '../schemas';
import { validate } from '../middleware';
import { transactions } from '../controllers';

const router = express.Router();

router.get('/', transactions.getTransactions);

router.get('/add', transactions.addTransactions);

router.get(
    '/:transactionId',
    validate(transactionsSchema.getTransactionByIdSchema),
    transactions.getTransactionById
);

router.get(
    '/occasions/:occasionId',
    validate(transactionsSchema.getTransactionByOccasionIdSchema),
    transactions.getTransactionByOccasionId
);

router.get(
    '/type/:transactionTypeId',
    validate(transactionsSchema.getTransactionByTransactionTypeIdSchema),
    transactions.getTransactionByTransactionTypeId
);

router.post(
    '/',
    validate(transactionsSchema.createTransactionSchema),
    transactions.createTransaction
);

router.put(
    '/:transactionId',
    validate(transactionsSchema.updateTransactionSchema),
    transactions.updateTransaction
);

router.delete(
    '/:transactionId',
    validate(transactionsSchema.deleteTransactionSchema),
    transactions.deleteTransaction
);

router.post(
    '/:transactionId/tags',
    validate(transactionsSchema.createTransactionTagsSchema),
    transactions.createTransactionTags
);

router.delete(
    '/:transactionId/tags',
    validate(transactionsSchema.deleteTransactionTagsSchema),
    transactions.deleteTransactionTags
);

export default router;
