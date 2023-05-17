import { Request, Response, ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (
    error,
    req: Request,
    res: Response
) => {
    console.error(error);
    return res.sendStatus(500);
};

export default errorHandler;
