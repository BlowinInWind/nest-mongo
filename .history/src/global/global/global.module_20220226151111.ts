import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GlobalService } from './global.service';
import { GlobalController } from './global.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('DB_USER');
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
