import { Global, Module } from '@nestjs/common';

import { GlobalService } from './global.service';
import { GlobalController } from './global.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    CONFIG
    MongooseModule.forRootAsync({
      inject: [C]
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
