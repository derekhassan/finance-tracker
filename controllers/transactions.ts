import { Request, Response, NextFunction } from 'express';
import prisma from '../db';
import { startOfMonth, lastDayOfMonth } from 'date-fns';
import { TRANSACTION_TYPES } from '../constants';
import occasions from './occasions';

interface CreateTransactionRequest {
    transactionTypeId: number;
    transactionOccasionId?: number;
    date: string;
    description: string;
    amount: number;
    tags: string[];
}

interface UpdateTransactionRequest {
    transactionTypeId?: number;
    transactionOccasionId?: number;
    date?: string;
    description?: string;
    amount?: number;
    tags?: string[];
}

interface UpdateTransactionTagsRequest {
    tags: string[];
}

interface GetTransactionRequestQuery {
    limit?: string;
    tag?: string;
}

interface AddTransactionRequestQuery {
    tags?: string[];
    month?: string;
    year?: string;
    transactionOccasionId?: string;
}

const getTransactions = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { limit, tag } = req.query as GetTransactionRequestQuery;
        const transactions = await prisma.transaction.findMany({
            where: {
                ...(typeof tag === 'string'
                    ? {
                          tags: {
                              some: {
                                  name: tag,
                              },
                          },
                      }
                    : {}),
            },
            ...(typeof limit === 'string' ? { take: parseInt(limit, 10) } : {}),
        });

        return res.json(transactions);
    } catch (e) {
        next(e);
    }
};

const getTransactionById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { transactionId } = req.params;

        const transaction = await prisma.transaction.findUnique({
            where: {
                id: parseInt(transactionId, 10),
            },
            include: {
                transactionType: {
                    select: {
                        type: true,
                    },
                },
                tags: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        return res.json(transaction);
    } catch (e) {
        next(e);
    }
};

const getTransactionByOccasionId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { occasionId } = req.params;
        const transactions = await prisma.transaction.findMany({
            where: {
                transactionOccasionId: parseInt(occasionId, 10),
            },
        });

        return res.json(transactions);
    } catch (e) {
        next(e);
    }
};

const getTransactionByTransactionTypeId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { transactionTypeId } = req.params;
        const transactions = await prisma.transaction.findMany({
            where: {
                transactionTypeId: parseInt(transactionTypeId, 10),
            },
        });

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
            transactionTypeId = TRANSACTION_TYPES.INCOME,
            date,
            transactionOccasionId,
            description = '',
            amount,
            tags = ['Uncategorized'],
        } = req.body as CreateTransactionRequest;

        const createdTransaction = await prisma.transaction.create({
            data: {
                date: new Date(date),
                description,
                amount,
                transactionType: {
                    connect: {
                        id: transactionTypeId,
                    },
                },
                tags: {
                    connectOrCreate: tags.map((tag) => {
                        return {
                            where: {
                                name: tag,
                            },
                            create: {
                                name: tag,
                            },
                        };
                    }),
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
        const {
            transactionTypeId,
            date,
            transactionOccasionId,
            description,
            amount,
            // tags,
        } = req.body as UpdateTransactionRequest;

        const updatedTransaction = await prisma.transaction.update({
            where: {
                id: parseInt(transactionId, 10),
            },
            data: {
                transactionTypeId,
                date,
                transactionOccasionId,
                description,
                amount,
                // ...(tags && tags.length
                //     ? {
                //           tags: {
                //               set: tags.map((tag) => ({ name: tag })),
                //           },
                //       }
                //     : {}),
            },
        });

        return res.status(201).json(updatedTransaction);
    } catch (e) {
        next(e);
    }
};

const createTransactionTags = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { transactionId } = req.params;
        const { tags } = req.body as UpdateTransactionTagsRequest;

        const updatedTransaction = await prisma.transaction.update({
            where: {
                id: parseInt(transactionId, 10),
            },
            data: {
                tags: {
                    create: tags.map((tag) => ({ name: tag })),
                },
            },
        });

        return res.status(201).json(updatedTransaction);
    } catch (e) {
        next(e);
    }
};

const deleteTransactionTags = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { transactionId } = req.params;
        const { tags } = req.body as UpdateTransactionTagsRequest;

        const updatedTransaction = await prisma.transaction.update({
            where: {
                id: parseInt(transactionId, 10),
            },
            data: {
                tags: {
                    deleteMany: tags.map((tag) => ({ name: tag })),
                },
            },
        });

        return res.status(200).json(updatedTransaction);
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

const addTransactions = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            tags = [],
            month = '',
            year = '',
            transactionOccasionId = '',
        } = req.query as AddTransactionRequestQuery;

        const monthDate = new Date(
            year ? parseInt(year, 10) : new Date().getFullYear(),
            parseInt(month, 10),
            0
        );
        const firstDateOfMonth = startOfMonth(monthDate);
        const lastDateOfMonth = lastDayOfMonth(monthDate);

        const transactions = await prisma.transaction.findMany({
            where: {
                ...(Array.isArray(tags) && tags.length > 0
                    ? {
                          tags: {
                              some: {
                                  name: {
                                      in: tags,
                                  },
                              },
                          },
                      }
                    : {}),
                ...(month
                    ? {
                          date: {
                              gte: firstDateOfMonth,
                              lte: lastDateOfMonth,
                          },
                      }
                    : {}),
                ...(transactionOccasionId && parseInt(transactionOccasionId)
                    ? {
                          transactionOccasionId: parseInt(
                              transactionOccasionId
                          ),
                      }
                    : {}),
            },
            select: {
                amount: true,
            },
        });

        const total = transactions.reduce(
            (acc, curr) => acc + curr.amount.toNumber(),
            0
        );

        return res.json({
            total: total.toFixed(2),
        });
    } catch (e) {
        next(e);
    }
};

export default {
    getTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionByOccasionId,
    getTransactionByTransactionTypeId,
    createTransactionTags,
    deleteTransactionTags,
    addTransactions,
};
