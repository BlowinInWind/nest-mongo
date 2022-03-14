import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { LoggerService } from '../logger';
import { AjaxResult } from '../class';
import { ApiException } from '../exceptions';
import { LOGGER_MODULE_NEST_PROVIDER } from 'src/common/logger/logger.constants';
import { logMessage } from '../utils';

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
  constructor(
    @Inject(LOGGER_MODULE_NEST_PROVIDER)
    private readonly logger?: LoggerService,
  ) {}

  catch(exception: T, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    // const request = host.switchToHttp().getRequest();
    const { status, result } = this.errorResult(exception, host);

    response.header('Content-Type', 'application/json; charset=utf-8');

    response.status(status).json(result);
  }

  /* 解析错误类型，获取状态码和返回值 */
  errorResult(exception, host: ArgumentsHost) {
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const code =
      exception instanceof ApiException
        ? (exception as ApiException).getErrCode()
        : status;

    let message: string;
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      message = (response as any).message ?? response;
    } else {
      message = `${exception}`;
    }

    const request = host.switchToHttp().getRequest();

    // 获取请求的信息
    const errMessage = logMessage(request);

    const now = Date.now();

    // 报错信息记录到logger
    this.logger.error(
      `${errMessage.method} ${errMessage.url} ${Date.now() - now}ms`,
    );
    this.logger.error(errMessage, 'filter记录日志');

    return { status, result: AjaxResult.error(message, code) };
  }
}
