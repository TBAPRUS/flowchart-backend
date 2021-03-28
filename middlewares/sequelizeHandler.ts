import { Request, Response, NextFunction } from 'express';
import { ValidationErrorItem } from 'sequelize';
import * as e from '../tools/ErrorResponse';

export default (
  fn: (req: Request, res: Response, next: NextFunction) => void
) => (req: Request, res: Response, next: NextFunction) => Promise
  .resolve(fn(req, res, next))
  .catch((err) => {
    let message: string;
    let status: number;
    let type: e.ErrorType;
    let data: any;
    console.log(err)
    switch (err.name) {
      case 'SequelizeDatabaseError':
        message = 'Ошибка сервера, попробуйте позже';
        status = 500;
        type = e.SEQUELIZE_DATABASE_ERROR;
        break;
      case 'SequelizeValidationError':
        message = err.errors.reduce((acc: string, cur: ValidationErrorItem) => `${acc}${cur.message}\n`, '');
        status = 415;
        type = e.SEQUELIZE_VALIDATION_ERROR;
        data = err.errors;
        break;
      case 'SequelizeUniqueConstraintError':
        message = err.errors.reduce((acc: string, cur: ValidationErrorItem) => `${acc}${cur.message}\n`, '');
        status = 415;
        type = e.SEQUELIZE_UNIQUE_CONSTRAINT_ERROR;
        data = err.errors;
        break;
      default:
        message = 'Ошибка сервера, попробуйте позже';
        status = 500;
        type = e.SERVER_ERROR;
        break;
    }
    const error = new e.ErrorResponse(message, status, type, data);
    next(error)
  });