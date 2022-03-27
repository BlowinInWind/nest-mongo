import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LogMiddleware1 implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('middle prev');
    next();
    console.log('middle next');
  }
}

import { Request, Response, NextFunction } from 'express';

export function LogMiddleware(req: any, res: Response, next: NextFunction) {
  console.log(`LogMiddleware prev`);
  req.test = { nickname: 'jiangtong' };
  next();
  console.log(`LogMiddleware next`);
}
