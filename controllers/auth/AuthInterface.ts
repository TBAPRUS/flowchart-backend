import { Request, Response, NextFunction } from 'express'
import { Schema } from "express-validator";
import { UserAttributes } from '../../interfaces/UserInterface';

export interface AuthValidatorInterface {
    register: Schema;
    login: Schema;
}

export interface AuthControllerInterface {
    login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}