import { z } from 'zod';

const getAccountTypeByIdSchema = z.object({
    params: z.object({
        accountTypeId: z.coerce.number(),
    }),
});

const createAccountTypeSchema = z.object({
    body: z.object({
        type: z.string(),
    }),
});

const updateAccountTypeSchema = z.object({
    body: z.object({
        type: z.string().optional(),
    }),
    params: z.object({
        accountTypeId: z.coerce.number(),
    }),
});

const deleteAccountTypeSchema = z.object({
    params: z.object({
        accountTypeId: z.coerce.number(),
    }),
});

export default {
    getAccountTypeByIdSchema,
    createAccountTypeSchema,
    updateAccountTypeSchema,
    deleteAccountTypeSchema,
};
