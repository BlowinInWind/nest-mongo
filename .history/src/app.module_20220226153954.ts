import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './global/global.module';
import * as path from 'path';

const devPath = path.resolve(process.cwd(), '.env');

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: devPath }), GlobalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
