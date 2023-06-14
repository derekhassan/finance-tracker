import { Request, Response, NextFunction } from 'express';
import prisma from '../db';

interface CreateTagRequest {
    name: string;
}

interface UpdateTagRequest {
    name: string | undefined;
}

const getTags = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tags = await prisma.tag.findMany();

        return res.json(tags);
    } catch (e) {
        next(e);
    }
};

const getTagById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tagId } = req.params;
        const tag = await prisma.tag.findUnique({
            where: {
                id: parseInt(tagId, 10),
            },
        });

        return res.json(tag);
    } catch (e) {
        next(e);
    }
};

const createTag = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body as CreateTagRequest;
        const tag = await prisma.tag.create({
            data: {
                name,
            },
        });

        return res.status(201).json(tag);
    } catch (e) {
        next(e);
    }
};

const updateTag = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tagId } = req.params;
        const { name } = req.body as UpdateTagRequest;

        const updatedTag = await prisma.tag.update({
            where: {
                id: parseInt(tagId, 10),
            },
            data: {
                name,
            },
        });

        return res.status(201).json(updatedTag);
    } catch (e) {
        next(e);
    }
};

const deleteTag = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tagId } = req.params;

        await prisma.tag.delete({
            where: {
                id: parseInt(tagId, 10),
            },
        });

        return res.sendStatus(204);
    } catch (e) {
        next(e);
    }
};

export default { getTags, createTag, updateTag, deleteTag, getTagById };
