import { Request, Response, NextFunction } from 'express';
import prisma from '../db';

interface CreateAccountTypeRequest {
    type: string;
}

interface UpdateAccountTypeRequest {
    type: string | undefined;
}

const getAccountTypes = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const accountTypes = await prisma.accountType.findMany();

        return res.json(accountTypes);
    } catch (e) {
        next(e);
    }
};

const getAccountTypeById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { accountTypeId } = req.params;
        const accountType = await prisma.accountType.findUnique({
            where: {
                id: parseInt(accountTypeId, 10),
            },
        });

        return res.json(accountType);
    } catch (e) {
        next(e);
    }
};

const createAccountType = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { type } = req.body as CreateAccountTypeRequest;
        const accountType = await prisma.accountType.create({
            data: {
                type,
            },
        });

        return res.status(201).json(accountType);
    } catch (e) {
        next(e);
    }
};

const updateAccountType = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { accountTypeId } = req.params;
        const { type } = req.body as UpdateAccountTypeRequest;
        const updatedAccountType = await prisma.accountType.update({
            where: {
                id: parseInt(accountTypeId, 10),
            },
            data: {
                type,
            },
        });

        return res.status(201).json(updatedAccountType);
    } catch (e) {
        next(e);
    }
};

const deleteAccountType = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { accountTypeId } = req.params;
        await prisma.accountType.delete({
            where: {
                id: parseInt(accountTypeId, 10),
            },
        });

        return res.sendStatus(204);
    } catch (e) {
        next(e);
    }
};

export default {
    getAccountTypes,
    getAccountTypeById,
    createAccountType,
    updateAccountType,
    deleteAccountType,
};
