import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';

const errorHandler: ErrorRequestHandler = (
    error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {
    console.error(error);
    return res.sendStatus(500);
};

export default errorHandler;
