import { Request, Response, NextFunction } from 'express';
import { ErrorResponseInterface } from '../tools/ErrorResponse';

export default (err: ErrorResponseInterface, req: Request, res: Response, next: NextFunction) => {
  res
    .status(err.statusCode)
    .json({
        success: false,
        type: err.type,
        message: err.message,
        data: err.data
    });
}