import { z } from 'zod';

const getAccountByIdSchema = z.object({
    params: z.object({
        accountId: z.coerce.number(),
    }),
});

const createAccountSchema = z.object({
    body: z.object({
        name: z.string(),
        accountTypeId: z.number(),
    }),
});

const updateAccountSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        accountTypeId: z.number().optional(),
    }),
    params: z.object({
        accountId: z.coerce.number(),
    }),
});

const deleteAccountSchema = z.object({
    params: z.object({
        accountId: z.coerce.number(),
    }),
});

export default {
    getAccountByIdSchema,
    createAccountSchema,
    updateAccountSchema,
    deleteAccountSchema,
};
