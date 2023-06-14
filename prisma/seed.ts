import prisma from '../db';

const seed = async () => {
    await prisma.transactionType.createMany({
        data: [
            {
                type: 'Income',
            },
            {
                type: 'Expense',
            },
            {
                type: 'Investment',
            },
            {
                type: 'Transfer',
            },
        ],
    });
    await prisma.tag.create({
        data: {
            name: 'Uncategorized',
        },
    });
};

seed()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
