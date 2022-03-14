import { DynamicModule, Global, Module } from '@nestjs/common';
import { LoggerOptions } from 'winston';
import { createLoggerProviders } from './logger.provider';

@Global()
@Module({})
export class LoggerModule {
  public static forRoot(logOptions?: LoggerOptions): DynamicModule {
    const providers = createLoggerProviders(logOptions);

    return {
      module: LoggerModule,
      providers: providers,
      exports: providers,
    };
  }
}
