import { z } from 'zod';

const createTransactionSchema = z.object({
    body: z.object({
        transactionTypeId: z.number(),
        transactionOccasionId: z.number().optional(),
        date: z.date(),
        description: z.string(),
    }),
});

const updateTransactionSchema = z.object({
    body: z.object({
        transactionTypeId: z.number().optional(),
        transactionOccasionId: z.number().optional(),
        date: z.date().optional(),
        description: z.string().optional(),
    }),
    params: z.object({
        transactionId: z.number(),
    }),
});

const deleteTransactionSchema = z.object({
    params: z.object({
        transactionId: z.number(),
    }),
});

export {
    createTransactionSchema,
    updateTransactionSchema,
    deleteTransactionSchema,
};
