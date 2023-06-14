import express from 'express';
import { tagsSchema } from '../schemas';
import { validate } from '../middleware';
import { tags } from '../controllers';

const router = express.Router();

router.get('/', tags.getTags);

router.get('/:tagId', validate(tagsSchema.getTagByIdSchema), tags.getTagById);

router.post('/', validate(tagsSchema.createTagSchema), tags.createTag);

router.put('/:tagId', validate(tagsSchema.updateTagSchema), tags.updateTag);

router.delete('/:tagId', validate(tagsSchema.deleteTagSchema), tags.deleteTag);

export default router;
