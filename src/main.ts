import { NestFactory } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSession } from './setup-session';
import { AllExceptionFilter } from 'src/common/filters';
import {
  ResponseTransformInterceptor,
  LoggerInterceptor,
} from 'src/common/interceptors';
import { ValidationPipe } from 'src/common/pipes';
import helmet from 'helmet';
import { LogMiddleware } from './common/middlewares';
import { LOGGER_MODULE_NEST_PROVIDER } from './common/logger/logger.constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 替换全局日志系统
  const logger = app.get(LOGGER_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  // 启动session
  await setupSession(app);

  //允许跨域请求
  app.enableCors();
  // Web漏洞的
  app.use(helmet());

  app.use(LogMiddleware);

  // 设置全局过滤器
  app.useGlobalFilters(new AllExceptionFilter(logger));

  app.useGlobalInterceptors(
    // 日志拦截
    new LoggerInterceptor(logger),
    new ResponseTransformInterceptor(new Reflector()),
  );

  /* 全局参数校验管道 */
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Nest Mongo')
    .setDescription('The Nest Mongo API description')
    .setVersion('1.0')
    .addTag('Nest Mongo')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customCss: '../node_modules/swagger-ui-dist/swagger-ui.css',
  });

  await app.listen(3333);
}
bootstrap();
