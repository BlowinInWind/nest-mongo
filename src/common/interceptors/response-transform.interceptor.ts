import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AjaxResult } from '../class';
import { KEEP_KEY } from '../constants';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Interceptor prev');
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => {
        console.log('Interceptor next');

        // getHandler 值将覆盖 getClass上面的值
        const keep = this.reflector.getAllAndOverride<boolean>(KEEP_KEY, [
          context.getHandler(),
          context.getClass(),
        ]);

        if (keep) {
          return data;
        }

        const response = context.switchToHttp().getResponse();
        response.header('Content-Type', 'application/json; charset=utf-8');
        return AjaxResult.success(data);
      }),
      // catchError((err) => {
      //   throw new BadGatewayException();
      // }),
    );
  }
}
