import { Request, Response, NextFunction } from 'express';
import prisma from '../db';

interface CreateOccasionRequest {
    name: string;
}

interface UpdateOccasionRequest {
    name: string;
}

const getOccasions = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const occasions = await prisma.transactionOccasion.findMany();

        return res.json(occasions);
    } catch (e) {
        next(e);
    }
};

const getOccasionById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { occasionId } = req.params;

        const occasion = await prisma.transactionOccasion.findUnique({
            where: {
                id: parseInt(occasionId, 10),
            },
        });

        return res.json(occasion);
    } catch (e) {
        next(e);
    }
};

const createOccasion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name } = req.body as CreateOccasionRequest;
        const occasion = await prisma.transactionOccasion.create({
            data: {
                name,
            },
        });

        return res.status(201).json(occasion);
    } catch (e) {
        next(e);
    }
};

const updateOccasion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { occasionId } = req.params;
        const { name } = req.body as UpdateOccasionRequest;
        const updatedOccasion = await prisma.transactionOccasion.update({
            where: {
                id: parseInt(occasionId, 10),
            },
            data: {
                name,
            },
        });

        return res.status(201).json(updatedOccasion);
    } catch (e) {
        next(e);
    }
};

const deleteOccasion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { occasionId } = req.params;

        await prisma.transactionOccasion.delete({
            where: {
                id: parseInt(occasionId, 10),
            },
        });

        return res.sendStatus(204);
    } catch (e) {
        next(e);
    }
};

export default {
    getOccasions,
    getOccasionById,
    createOccasion,
    updateOccasion,
    deleteOccasion,
};
