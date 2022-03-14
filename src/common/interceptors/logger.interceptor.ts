import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Inject,
  NestInterceptor,
} from '@nestjs/common';
import { LoggerService } from '../logger';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LOGGER_MODULE_NEST_PROVIDER } from 'src/common/logger/logger.constants';
import { logMessage } from '../utils';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    @Inject(LOGGER_MODULE_NEST_PROVIDER)
    private readonly logger?: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const now = Date.now();

    const requestMessage = logMessage(request);

    return next.handle().pipe(
      tap(() => {
        this.logger.info(
          `${requestMessage.method} ${requestMessage.url} ${
            Date.now() - now
          }ms`,
          context.getClass().name,
        );
      }),
      map((data) => {
        this.logger.info(requestMessage, '中间件记录日志');
        return data;
      }),
    );
  }
}
