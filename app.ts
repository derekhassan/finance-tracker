import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import { errorHandler } from './middleware';
import {
    transactions,
    tags,
    accounts,
    occasions,
    accountTypes,
} from './routes';
import { serve, setup, JsonObject } from 'swagger-ui-express';
import YAML from 'yaml';
import fs from 'fs';

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const swaggerYml = fs.readFileSync('./swagger.yml', 'utf8');
const swaggerDocument = YAML.parse(swaggerYml) as JsonObject;

app.use('/api-docs', serve, setup(swaggerDocument));
app.use('/transactions', transactions);
app.use('/tags', tags);
app.use('/accounts', accounts);
app.use('/occasions', occasions);
app.use('/account-types', accountTypes);

app.use((req, res) => res.sendStatus(404));

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
