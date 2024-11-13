import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  const { method, baseUrl } = req;

  console.log(`${method} ${baseUrl}`);
  next();
}
