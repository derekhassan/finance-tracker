import { z } from 'zod';

const getTransactionByIdSchema = z.object({
    params: z.object({
        transactionId: z.coerce.number(),
    }),
});

const getTransactionByOccasionIdSchema = z.object({
    params: z.object({
        occasionId: z.coerce.number(),
    }),
});

const getTransactionByTransactionTypeIdSchema = z.object({
    params: z.object({
        transactionTypeId: z.coerce.number(),
    }),
});

const createTransactionSchema = z.object({
    body: z.object({
        transactionTypeId: z.coerce.number().optional(),
        amount: z.number(),
        transactionOccasionId: z.number().optional(),
        date: z.coerce.date(),
        description: z.string(),
        tags: z.array(z.string()),
    }),
});

const updateTransactionSchema = z.object({
    body: z.object({
        transactionTypeId: z.number().optional(),
        transactionOccasionId: z.number().optional(),
        amount: z.number().optional(),
        date: z.date().optional(),
        description: z.string().optional(),
    }),
    params: z.object({
        transactionId: z.coerce.number(),
    }),
});

const deleteTransactionSchema = z.object({
    params: z.object({
        transactionId: z.coerce.number(),
    }),
});

const deleteTransactionTagsSchema = z.object({
    body: z.object({
        tags: z.array(z.string()),
    }),
    params: z.object({
        transactionId: z.coerce.number(),
    }),
});

const createTransactionTagsSchema = z.object({
    body: z.object({
        tags: z.array(z.string()),
    }),
    params: z.object({
        transactionId: z.coerce.number(),
    }),
});

export default {
    getTransactionByIdSchema,
    getTransactionByOccasionIdSchema,
    getTransactionByTransactionTypeIdSchema,
    createTransactionSchema,
    updateTransactionSchema,
    deleteTransactionSchema,
    deleteTransactionTagsSchema,
    createTransactionTagsSchema,
};
