import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { UserRequest } from '../interfaces/UserRequestInterface';
import { ErrorResponse, NOT_AUTHORIZE } from '../tools/ErrorResponse';
import User from '../models/user';
import asyncHandler from './asyncHandler';

// req: Request -> UserRequest
export default asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token: string = '';

  const auth = req.headers['authorization'];
  if (auth && auth.slice(0, 6) === 'Bearer') {
    token = auth.slice(7);
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new ErrorResponse('Not authorize to access this route', 401, NOT_AUTHORIZE))
  }

  const decoded: string | {id?: string} = await jwt.verify(token, process.env.JWT_SECRET as string);

  if (typeof decoded === 'object') {
    (req as UserRequest).user = await User.findOne({
      where: {
        id: decoded.id
      },
      attributes: {
        exclude: ['password']
      }
    }) as User
  }

  next();
});