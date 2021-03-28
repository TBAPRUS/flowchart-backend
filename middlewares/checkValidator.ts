import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator';
import { ErrorResponse, VALIDATION_ERROR } from '../tools/ErrorResponse';

export default (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array();
    if (errors.length) {
        const message = errors.reduce((acc, cur) => `${acc}${cur.param} - ${cur.msg}\n`, '');
        const error = new ErrorResponse(message, 415, VALIDATION_ERROR, errors);
        return next(error);
    }
    next();
}