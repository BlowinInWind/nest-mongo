import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './global/global/global.module';
import envConfig from '../config/env';

console.log(envConfig.path);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [envConfig.path] }),
    GlobalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
