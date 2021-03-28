import { Request, Response, NextFunction } from 'express';

export default (...params: string[]) => (req: Request, res: Response, next: NextFunction) => {
  const body: {
    [key: string]: any
  } = {};
  for (let param of params) {
    body[param] = req.body[param];
  }
  req.body = body;
  next();
}