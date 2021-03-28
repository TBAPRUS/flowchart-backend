export type ErrorType = 
    | 'VALIDATION_ERROR' 
    | 'SEQUELIZE_VALIDATION_ERROR' 
    | 'SEQUELIZE_DATABASE_ERROR' 
    | 'SERVER_ERROR' 
    | 'SEQUELIZE_UNIQUE_CONSTRAINT_ERROR'
    | 'NOT_AUTHORIZE'
    | 'INVALID_CRESENTIALS';

export const VALIDATION_ERROR: ErrorType = 'VALIDATION_ERROR';
export const SEQUELIZE_VALIDATION_ERROR: ErrorType = 'SEQUELIZE_VALIDATION_ERROR';
export const SEQUELIZE_DATABASE_ERROR: ErrorType = 'SEQUELIZE_DATABASE_ERROR';
export const SEQUELIZE_UNIQUE_CONSTRAINT_ERROR: ErrorType = 'SEQUELIZE_UNIQUE_CONSTRAINT_ERROR'
export const SERVER_ERROR: ErrorType = 'SERVER_ERROR';
export const NOT_AUTHORIZE: ErrorType = 'NOT_AUTHORIZE';
export const INVALID_CRESENTIALS: ErrorType = 'INVALID_CRESENTIALS'

export interface ErrorResponseInterface extends Error {
    statusCode: number;
    type: ErrorType;
    data?: any;
}

export class ErrorResponse extends Error implements ErrorResponseInterface {
    statusCode: number;
    type: ErrorType;
    data: any;
    constructor(message: string, statusCode: number, type: ErrorType, data: any = {}) {
        super(message);
        this.statusCode = statusCode;
        this.type = type;
        this.data = data;

        Error.captureStackTrace(this, this.constructor);
    }
}