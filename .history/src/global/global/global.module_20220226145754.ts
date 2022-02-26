import { Module } from '@nestjs/common';
import { GlobalService } from './global.service';
import { GlobalController } from './global.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [GlobalController],
  providers: [GlobalService],
})
export class GlobalModule {}
