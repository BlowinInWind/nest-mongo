import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GlobalService } from './global.service';
import { GlobalController } from './global.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (params) => {
        return {
          uri: '',
          dbName: '',
        };
      },
    }),
  ],
  controllers: [GlobalController],
  providers: [GlobalService],
})
export class GlobalModule {}
