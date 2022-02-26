import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './global/global/global.module';
// import envConfig from '../config/env';
import * as path from 'path';

// console.log(envConfig.path);
console.log(path.resolve(process.cwd(), '.env'));
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: path.resolve(process.cwd(), '.env') }),
    GlobalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
console.log(path.resolve(process.cwd(), '.env'));
