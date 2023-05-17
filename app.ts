import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import { errorHandler } from './middleware';
import { transactions } from './routes';

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/transactions', transactions);

app.use((req, res) => {
    res.sendStatus(404);
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
