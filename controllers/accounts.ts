import { Request, Response, NextFunction } from 'express';
import prisma from '../db';

interface CreateAccountRequest {
    name: string;
    accountTypeId: number;
}

interface UpdateAccountRequest {
    name: string | undefined;
    accountTypeId: number | undefined;
}

const getAccounts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accounts = await prisma.account.findMany();

        return res.json(accounts);
    } catch (e) {
        next(e);
    }
};

const getAccountById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { accountId } = req.params;
        const account = await prisma.account.findUnique({
            where: {
                id: parseInt(accountId, 10),
            },
        });

        return res.json(account);
    } catch (e) {
        next(e);
    }
};

const createAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, accountTypeId } = req.body as CreateAccountRequest;
        const account = await prisma.account.create({
            data: {
                name,
                accountTypeId,
            },
        });

        return res.status(201).json(account);
    } catch (e) {
        next(e);
    }
};

const updateAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { accountId } = req.params;
        const { name, accountTypeId } = req.body as UpdateAccountRequest;
        const updatedAccount = await prisma.account.update({
            where: {
                id: parseInt(accountId, 10),
            },
            data: {
                name,
                accountTypeId,
            },
        });

        return res.status(201).json(updatedAccount);
    } catch (e) {
        next(e);
    }
};

const deleteAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { accountId } = req.params;
        await prisma.account.delete({
            where: {
                id: parseInt(accountId, 10),
            },
        });

        return res.sendStatus(204);
    } catch (e) {
        next(e);
    }
};

export default {
    getAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    deleteAccount,
};
