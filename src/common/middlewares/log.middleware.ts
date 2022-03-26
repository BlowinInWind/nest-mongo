// import { Injectable, NestMiddleware } from '@nestjs/common';

// @Injectable()
// export class LogMiddleware implements NestMiddleware {
//   use(req: any, res: any, next: () => void) {
//     console.log('middle prev');
//     next();
//     console.log('middle next');
//   }
// }

import { Request, Response, NextFunction } from 'express';

export function LogMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(`LogMiddleware prev`);
  next();
  console.log(`LogMiddleware next`);
}
