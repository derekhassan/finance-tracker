import express from 'express';
import { occasionsSchema } from '../schemas';
import { validate } from '../middleware';
import { occasions } from '../controllers';

const router = express.Router();

router.get('/', occasions.getOccasions);

router.get(
    '/:occasionId',
    validate(occasionsSchema.getOccasionByIdSchema),
    occasions.getOccasionById
);

router.post(
    '/',
    validate(occasionsSchema.createOccasionSchema),
    occasions.createOccasion
);

router.put(
    '/:occasionId',
    validate(occasionsSchema.updateOccasionSchema),
    occasions.updateOccasion
);

router.delete(
    '/:occasionId',
    validate(occasionsSchema.deleteOccasionSchema),
    occasions.deleteOccasion
);

export default router;
