import { Injectable, LoggerService } from '@nestjs/common';
import { Logger, format, createLogger, transport, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as path from 'path';
const { combine, timestamp, colorize, prettyPrint, printf } = format;

type ObjectType = Record<string, any>;

const transportsHandler = () => {
  const transportsList: transport[] = [
    new DailyRotateFile({
      filename: path.join(process.cwd(), 'logs', 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error',
    }),
    new DailyRotateFile({
      filename: path.join(process.cwd(), 'logs', 'info-%DATE%.log'),
      // 按天存放
      // datePattern: 'YYYY-MM-DD',
      // 按小时来
      datePattern: 'YYYY-MM-DD-HH',
      // 自动压缩
      zippedArchive: true,
      handleExceptions: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'silly',
    }),
  ];

  process.env.NODE_ENV != 'production' &&
    transportsList.push(new transports.Console({}));

  return transportsList;
};

const toString = (message: string | ObjectType): string => {
  if (typeof message === 'object') {
    return JSON.stringify(message, null, 2);
  } else {
    return message as string;
  }
};

@Injectable()
export class LogService implements LoggerService {
  private logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: process.env.NODE_ENV != 'production' ? 'silly' : 'info',
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        colorize(),
        prettyPrint(),
        // 自定义输出代码格式
        printf(({ prefix, level, timestamp, message }) => {
          return `[${timestamp}] [${level}]${
            prefix ? `-【${prefix}】` : ''
          } ${message}`;
        }),
      ),
      transports: transportsHandler(),
    });
  }

  log(message: any) {
    this.logger.log('info', toString(message));
  }

  // log level 0
  public error(message: string | ObjectType, prefix = ''): void {
    this.logger.error(toString(message), { prefix });
  }

  // log level 1
  public warn(message: string | ObjectType, prefix = ''): void {
    this.logger.warn(toString(message), { prefix });
  }

  // log level 2
  public info(message: string | ObjectType, prefix = ''): void {
    this.logger.info(toString(message), { prefix });
  }

  // log level 3
  public http(message: string | ObjectType, prefix = ''): void {
    this.logger.http(toString(message), { prefix });
  }

  // log level 4
  public verbose(message: string | ObjectType, prefix = ''): void {
    this.logger.verbose(toString(message), { prefix });
  }

  // log level 5
  public debug(message: string | ObjectType, prefix = ''): void {
    this.logger.debug(toString(message), { prefix });
  }

  // log level 6
  public silly(message: string | ObjectType, prefix = ''): void {
    this.logger.silly(toString(message), { prefix });
  }
}
