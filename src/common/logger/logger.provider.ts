import { LoggerOptions, createLogger } from 'winston';
import { Provider } from '@nestjs/common';
import {
  LOGGER_MODULE_NEST_PROVIDER,
  LOGGER_MODULE_PROVIDER,
} from './logger.constants';
import { LogService } from './logger.service';

export function createLoggerProviders(loggerOpts: LoggerOptions): Provider[] {
  return [
    // 需要自定义的话使用第一种方式选择注入的logger
    {
      provide: LOGGER_MODULE_PROVIDER,
      useFactory: () => createLogger(loggerOpts),
    },
    // 这里默认不允许自定义了
    {
      provide: LOGGER_MODULE_NEST_PROVIDER,
      useClass: LogService,
    },
  ];
}
