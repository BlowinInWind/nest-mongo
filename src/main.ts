import { NestFactory } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSession } from './setup-session';
import { AllExceptionFilter } from 'src/common/filters';
import { ResponseTransformInterceptor } from 'src/common/interceptors';
import { ValidationPipe } from 'src/common/pipes';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 启动session
  await setupSession(app);

  //允许跨域请求
  app.enableCors();
  // Web漏洞的
  app.use(helmet());

  // 设置全局过滤器
  app.useGlobalFilters(new AllExceptionFilter());

  app.useGlobalInterceptors(new ResponseTransformInterceptor(new Reflector()));

  /* 全局参数校验管道 */
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
