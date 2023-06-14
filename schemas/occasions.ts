import { z } from 'zod';

const getOccasionByIdSchema = z.object({
    params: z.object({
        occasionId: z.coerce.number(),
    }),
});

const createOccasionSchema = z.object({
    body: z.object({
        name: z.string(),
    }),
});

const updateOccasionSchema = z.object({
    body: z.object({
        name: z.string().optional(),
    }),
    params: z.object({
        occasionId: z.coerce.number(),
    }),
});

const deleteOccasionSchema = z.object({
    params: z.object({
        occasionId: z.coerce.number(),
    }),
});

export default {
    getOccasionByIdSchema,
    createOccasionSchema,
    updateOccasionSchema,
    deleteOccasionSchema,
};
