import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

interface CustomRequest extends Request {
    body: object;
}

const validate =
    (schema: ZodSchema) =>
    async (req: CustomRequest, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            return next();
        } catch (err) {
            return res.status(400).send(err);
        }
    };

export default validate;
