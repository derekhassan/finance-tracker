import { Request, Response, NextFunction } from 'express';
import prisma from '../db';

interface CreateTransactionRequest {
    transactionTypeId: number;
    transactionOccasionId?: number;
    date: Date;
    description: string;
}

const getTransactions = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const transactions = await prisma.transaction.findMany();

        return res.json(transactions);
    } catch (e) {
        next(e);
    }
};

const createTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            transactionTypeId = 1,
            date = new Date(),
            transactionOccasionId,
            description = '',
        } = req.body as CreateTransactionRequest;

        const createdTransaction = await prisma.transaction.create({
            data: {
                date,
                description,
                transactionType: {
                    connect: {
                        id: transactionTypeId,
                    },
                },
                tags: {
                    connect: {
                        id: 1,
                    },
                },
                ...(transactionOccasionId
                    ? {
                          transactionOccasion: {
                              connect: {
                                  id: transactionOccasionId,
                              },
                          },
                      }
                    : {}),
            },
        });

        return res.status(201).json(createdTransaction);
    } catch (e) {
        next(e);
    }
};

const updateTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { transactionId } = req.params;

        const updatedTransaction = await prisma.transaction.update({
            where: {
                id: parseInt(transactionId, 10),
            },
            data: {},
        });

        return res.status(201).json(updatedTransaction);
    } catch (e) {
        next(e);
    }
};

const deleteTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { transactionId } = req.params;

        await prisma.transaction.delete({
            where: {
                id: parseInt(transactionId, 10),
            },
        });

        return res.sendStatus(204);
    } catch (e) {
        next(e);
    }
};

export default {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
};
