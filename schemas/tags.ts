import { z } from 'zod';

const getTagByIdSchema = z.object({
    params: z.object({
        tagId: z.coerce.number(),
    }),
});

const createTagSchema = z.object({
    body: z.object({
        name: z.string(),
    }),
});

const updateTagSchema = z.object({
    body: z.object({
        name: z.string().optional(),
    }),
    params: z.object({
        tagId: z.coerce.number(),
    }),
});

const deleteTagSchema = z.object({
    params: z.object({
        tagId: z.coerce.number(),
    }),
});

export default {
    getTagByIdSchema,
    createTagSchema,
    updateTagSchema,
    deleteTagSchema,
};
