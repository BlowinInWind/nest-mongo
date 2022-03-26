import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AjaxResult } from '../class';
import { ApiException } from '../exceptions';

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    console.log('filter prev');
    const response = host.switchToHttp().getResponse();
    // const request = host.switchToHttp().getRequest();
    const { status, result } = this.errorResult(exception);

    response.header('Content-Type', 'application/json; charset=utf-8');

    response.status(status).json(result);
  }

  /* 解析错误类型，获取状态码和返回值 */
  errorResult(exception: unknown) {
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

    return { status, result: AjaxResult.error(message, code) };
  }
}
